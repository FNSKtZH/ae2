import React, { useCallback, useContext } from 'react'
import IconButton from '@mui/material/IconButton'
import Icon from '@mui/material/Icon'
import EditIcon from '@mui/icons-material/Edit'
import ViewIcon from '@mui/icons-material/Visibility'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import Input from '@mui/material/Input'
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormHelperText from '@mui/material/FormHelperText'
import Checkbox from '@mui/material/Checkbox'
import styled from 'styled-components'
import get from 'lodash/get'
import format from 'date-fns/format'
import { useQuery, useApolloClient, gql } from '@apollo/client'
import { observer } from 'mobx-react-lite'
import { getSnapshot } from 'mobx-state-tree'

import Property from './Property'
import onBlur from './onBlur'
import PropertyReadOnly from '../shared/PropertyReadOnly'
import ErrorBoundary from '../shared/ErrorBoundary'
import mobxStoreContext from '../../mobxStoreContext'

const Container = styled.div`
  padding: 10px;
  display: flex;
  flex-direction: column;
`
const CardEditButton = styled(IconButton)`
  align-self: flex-end;
  :hover {
    font-weight: 700;
    background-color: rgba(0, 0, 0, 0.12);
    text-decoration: none;
  }
`
const StyledFormControl = styled(FormControl)`
  margin: 10px 0 5px 0 !important;
`
const StyledLabel = styled(FormControlLabel)`
  height: 30px;
  min-height: 30px;
  > span {
    font-weight: 500;
    line-height: 1em;
  }
`
const StyledA = styled.a`
  color: rgba(0, 0, 0, 0.54);
`

const allUsersQuery = gql`
  query AllUsersQuery {
    allUsers {
      totalCount
      nodes {
        id
        name
        email
        organizationUsersByUserId {
          nodes {
            id
            organizationId
            role
            organizationByOrganizationId {
              id
              name
            }
          }
        }
      }
    }
  }
`
const pcQuery = gql`
  query pCQuery($pCId: UUID!) {
    propertyCollectionById(id: $pCId) {
      id
      name
      description
      links
      combining
      organizationId
      lastUpdated
      termsOfUse
      importedBy
      organizationByOrganizationId {
        id
        name
      }
      propertyCollectionObjectsByPropertyCollectionId {
        totalCount
      }
    }
    # leave this as is only called once more and with more props
    allPropertyCollections {
      nodes {
        id
        name
      }
    }
  }
`

const PropertyCollection = () => {
  const client = useApolloClient()
  const mobxStore = useContext(mobxStoreContext)
  const { editingPCs, setEditingPCs, login } = mobxStore
  const activeNodeArray = getSnapshot(mobxStore.activeNodeArray)
  const pCId =
    activeNodeArray.length > 0
      ? activeNodeArray[1]
      : '99999999-9999-9999-9999-999999999999'

  const {
    data: allUsersData,
    loading: allUsersLoading,
    error: allUsersError,
  } = useQuery(allUsersQuery)
  const {
    data: pcData,
    loading: pcLoading,
    error: pcError,
  } = useQuery(pcQuery, {
    variables: {
      pCId,
    },
  })

  const pC = get(pcData, 'propertyCollectionById', {})
  const org = get(pC, 'organizationByOrganizationId.name', '')
  const { username } = login
  const allUsers = get(allUsersData, 'allUsers.nodes', [])
  const user = allUsers.find((u) => u.name === username)
  const orgsUserIsPCWriter = get(user, 'organizationUsersByUserId.nodes', [])
    .filter((o) => ['orgCollectionWriter', 'orgAdmin'].includes(o.role))
    .map((o) => ({
      id: o.organizationId,
      name: get(o, 'organizationByOrganizationId.name', ''),
    }))
  const userIsPCWriter = orgsUserIsPCWriter.length > 0
  const userIsThisPCWriter =
    !!orgsUserIsPCWriter.find((o) => o.id === pC.organizationId) ||
    (userIsPCWriter && !pC.organizationId)
  const idIsReferenced =
    get(pC, 'propertyCollectionObjectsByPropertyCollectionId.totalCount', 0) >
      0 ||
    get(pC, 'relationsByPropertyCollectionId.totalCount', 0) > 0 ||
    get(
      pC,
      'propertyCollectionObjectsByPropertyCollectionOfOrigin.totalCount',
      0,
    ) > 0 ||
    get(pC, 'relationsByPropertyCollectionOfOrigin.totalCount', 0) > 0
  const importedBy = pC.importedBy
  const importedByUser = allUsers.find((u) => u.id === importedBy)

  const onClickStopEditing = useCallback(
    (event) => {
      event.stopPropagation()
      setEditingPCs(false)
    },
    [setEditingPCs],
  )
  const onClickStartEditing = useCallback(
    (event) => {
      event.stopPropagation()
      setEditingPCs(true)
    },
    [setEditingPCs],
  )
  const onChangeCombining = useCallback(
    (event, isChecked) =>
      onBlur({
        client,
        field: 'combining',
        pC,
        value: isChecked,
        prevValue: pC.combining,
      }),
    [client, pC],
  )
  const onChangeOrganization = useCallback(
    (event) =>
      onBlur({
        client,
        field: 'organizationId',
        pC,
        value: event.target.value,
        prevValue: pC.organizationId,
      }),
    [client, pC],
  )
  const onChangeImportedBy = useCallback(
    (event) =>
      onBlur({
        client,
        field: 'importedBy',
        pC,
        value: event.target.value,
        prevValue: pC.importedBy,
      }),
    [client, pC],
  )

  if (pcLoading || allUsersLoading) {
    return <Container>Lade Daten...</Container>
  }
  if (pcError) {
    return <Container>{`Fehler: ${pcError.message}`}</Container>
  }
  if (allUsersError) {
    return <Container>{`Fehler: ${allUsersError.message}`}</Container>
  }

  return (
    <ErrorBoundary>
      <Container>
        {userIsThisPCWriter && editingPCs && (
          <CardEditButton
            aria-label="Daten anzeigen"
            title="Daten anzeigen"
            onClick={onClickStopEditing}
          >
            <Icon>
              <ViewIcon />
            </Icon>
          </CardEditButton>
        )}
        {userIsThisPCWriter && !editingPCs && (
          <CardEditButton
            aria-label="Daten bearbeiten"
            title="Daten bearbeiten"
            onClick={onClickStartEditing}
          >
            <Icon>
              <EditIcon />
            </Icon>
          </CardEditButton>
        )}
        {!editingPCs && (
          <>
            <PropertyReadOnly key="id" value={pC.id} label="id" />
            <PropertyReadOnly key="name" value={pC.name} label="Name" />
            <PropertyReadOnly
              key="description"
              value={pC.description}
              label="Beschreibung"
            />
            <PropertyReadOnly
              key="combining"
              value={
                pC.combining !== undefined
                  ? pC.combining
                      .toString()
                      .replace('true', 'ja')
                      .replace('false', 'nein')
                  : ''
              }
              label="zusammenfassend"
            />
            <PropertyReadOnly
              key="lastUpdated"
              value={format(new Date(pC.lastUpdated), 'dd.MM.yyyy')}
              label="Zuletzt aktualisiert"
            />
            <PropertyReadOnly
              key="links"
              value={pC.links ? pC.links.join(', ') : ''}
              label="Links"
            />
            <PropertyReadOnly
              key="org"
              value={org}
              label="Zuständige Organisation"
            />
            <PropertyReadOnly
              key="importedBy"
              value={`${importedByUser.name} (${importedByUser.email})`}
              label="Importiert von"
            />
            <PropertyReadOnly
              key="termsOfUse"
              value={pC.termsOfUse}
              label="Nutzungs-Bedingungen"
            />
          </>
        )}
        {editingPCs && (
          <>
            <Property
              key={`${pC.id}/id`}
              label="ID"
              field="id"
              pC={pC}
              disabled={idIsReferenced}
            />
            <Property
              key={`${pC.id}/name`}
              label="Name"
              field="name"
              pC={pC}
              helperText={
                <>
                  <span>
                    Ziel: der Leser sieht in der Liste der
                    Eigenschaften-Sammlungen auf einen Blick, worum es geht.
                  </span>
                  <br />
                  <br />
                  <span>
                    Der Name sollte ungefähr dem ersten Teil eines
                    Literaturzitats entsprechen. Aber möglichst kurz.
                  </span>
                  <br />
                  <span>Beispiel: "Artwert (2000)".</span>
                  <br />
                  <br />
                  <span>
                    Wurden die Informationen spezifisch für einen bestimmten
                    Kanton oder die ganze Schweiz erarbeitet?
                    <br />
                    Dann bitte das entsprechende Kürzel voranstellen.
                  </span>
                  <br />
                  <span>Beispiel: "ZH Artwert (2000)".</span>
                </>
              }
            />
            <Property
              key={`${pC.id}/description`}
              label="Beschreibung"
              field="description"
              pC={pC}
              helperText={
                <>
                  <span>
                    Ziel: der Leser kann urteilen, ob er diese Daten für seinen
                    Zweck benutzen kann.
                  </span>
                  <br />
                  <br />
                  <span>
                    Die Beschreibung sollte im ersten Teil etwa einem
                    klassischen Literaturzitat entsprechen.
                  </span>
                  <br />
                  <span>
                    Beispiel: "Gigon A. et al. (1998): Blaue Listen der
                    erfolgreich erhaltenen oder geförderten Tier- und
                    Pflanzenarten der Roten Listen. Methodik und Anwendung in
                    der nördlichen Schweiz. Veröff. Geobot. Inst. ETH, Stiftung
                    Rübel, Zürich 129: 1-137 + 180 pp. Appendicesn".
                  </span>
                  <br />
                  <br />
                  <span>
                    In einem zweiten Teil sollte beschrieben werden, welche
                    Informationen die Eigenschaftensammlung enthält.
                  </span>
                  <br />
                  <span>
                    Beispiel: "Eigenschaften von 207 Tier- und 885
                    Pflanzenarten".
                  </span>
                  <br />
                  <br />
                  <span>
                    Oft ist es zudem hilfreich zu wissen, für welchen Zweck die
                    Informationen zusammengestellt wurden.
                  </span>
                </>
              }
            />
            <StyledFormControl variant="standard">
              <StyledLabel
                control={
                  <Checkbox
                    color="primary"
                    checked={pC.combining}
                    onChange={onChangeCombining}
                  />
                }
                label={'zusammenfassend'}
              />
              <FormHelperText>
                <span>
                  Für eine zusammenfassende Eigenschaftensammlung importieren
                  Sie die Daten zwei mal:
                </span>
                <br />
                <span>1. zuerst in die Ursprungs-Eigenschaftensammlung</span>
                <br />
                <span>
                  2. dann in die zusammenfassende. Bitte die
                  Ursprungs-Eigenschaftensammlung angeben
                </span>
                <br />
                <span>
                  Mehr infos{' '}
                  <StyledA
                    href="https://github.com/barbalex/ae2#zusammenfassende-eigenschaften-sammlungen"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    hier
                  </StyledA>
                  .
                </span>
              </FormHelperText>
            </StyledFormControl>
            <Property
              key={`${pC.id}/lastUpdated`}
              label="Zuletzt aktualisiert"
              field="lastUpdated"
              pC={pC}
              disabled={true}
              helperText="Wann wurden die Eigenschaften dieser Sammlung zuletzt aktualisiert?"
            />
            <Property
              key={`${pC.id}/links`}
              label="Links"
              field="links"
              pC={pC}
              helperText={
                <>
                  <span>
                    Z.B. zu Originalpublikation, erläuternde Webseite...
                  </span>
                  <br />
                  <br />
                  <span>
                    Mehrere Links können komma-getrennt erfasst werden.
                  </span>
                </>
              }
            />
            <StyledFormControl variant="standard">
              <InputLabel htmlFor="organizationIdArten">
                Zuständige Organisation
              </InputLabel>
              <Select
                key={`${pC.id}/organizationId`}
                value={pC.organizationId || ''}
                onChange={onChangeOrganization}
                input={<Input id="organizationIdArten" />}
              >
                {orgsUserIsPCWriter.map((o) => (
                  <MenuItem key={o.id} value={o.id}>
                    {o.name}
                  </MenuItem>
                ))}
              </Select>
            </StyledFormControl>
            <StyledFormControl variant="standard">
              <InputLabel htmlFor="importedByArten">Importiert von</InputLabel>
              <Select
                key={`${pC.id}/importedBy`}
                value={pC.importedBy}
                onChange={onChangeImportedBy}
                input={<Input id="importedByArten" />}
              >
                {allUsers.map((u) => (
                  <MenuItem key={u.id} value={u.id}>
                    {u.name}
                  </MenuItem>
                ))}
              </Select>
            </StyledFormControl>
            <Property
              key={`${pC.id}/termsOfUse`}
              label="Nutzungs-Bedingungen"
              field="termsOfUse"
              pC={pC}
              helperText={
                <>
                  <span>
                    Beispiel, wenn Fremddaten mit Einverständnis des Autors
                    importiert werden:
                  </span>
                  <br />
                  <span>
                    "Importiert mit Einverständnis des Autors. Eine allfällige
                    Weiterverbreitung ist nur mit dessen Zustimmung möglich"
                  </span>
                  <br />
                  <br />
                  <span>Beispiel, wenn eigene Daten importiert werden:</span>
                  <br />
                  <span>
                    "Open Data: Die veröffentlichten Daten dürfen mit Hinweis
                    auf die Quelle vervielfältigt, verbreitet und weiter
                    zugänglich gemacht, angereichert und bearbeitet sowie
                    kommerziell genutzt werden. Für die Richtigkeit,
                    Genauigkeit, Zuverlässigkeit und Vollständigkeit der
                    bezogenen, ebenso wie der daraus erzeugten Daten und anderer
                    mit Hilfe dieser Daten hergestellten Produkte wird indessen
                    keine Haftung übernommen.
                  </span>
                </>
              }
            />
          </>
        )}
      </Container>
    </ErrorBoundary>
  )
}

export default observer(PropertyCollection)
