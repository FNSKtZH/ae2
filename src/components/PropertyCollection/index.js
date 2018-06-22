// @flow
import React, { Fragment } from 'react'
import compose from 'recompose/compose'
import IconButton from '@material-ui/core/IconButton'
import Icon from '@material-ui/core/Icon'
import EditIcon from '@material-ui/icons/Edit'
import ViewIcon from '@material-ui/icons/Visibility'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'
import FormControl from '@material-ui/core/FormControl'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormHelperText from '@material-ui/core/FormHelperText'
import Checkbox from '@material-ui/core/Checkbox'
import styled from 'styled-components'
import get from 'lodash/get'
import format from 'date-fns/format'
import { withApollo } from 'react-apollo'

import Property from './Property'
import onBlur from './onBlur'
import activeNodeArrayData from '../../modules/activeNodeArrayData'
import editingPCsData from '../../modules/editingPCsData'
import editingPCsMutation from '../../modules/editingPCsMutation'
import loginData from '../../modules/loginData'
import pCData from './pCData'
import PropertyReadOnly from '../shared/PropertyReadOnly'
import ErrorBoundary from '../shared/ErrorBoundary'

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

const enhance = compose(
  withApollo,
  activeNodeArrayData,
  loginData,
  editingPCsData,
  pCData
)

const PropertyCollection = ({
  client,
  pCData,
  loginData,
  editingPCsData,
}: {
  client: Object,
  pCData: Object,
  loginData: Object,
  editingPCsData: Object,
}) => {
  const { loading } = pCData
  if (loading) {
    return <Container>Lade Daten...</Container>
  }
  const pC = get(pCData, 'propertyCollectionById', {})
  const org = get(pC, 'organizationByOrganizationId.name', '')
  const editing = get(editingPCsData, 'editingPCs', false)
  const username = get(loginData, 'login.username', null)
  const allUsers = get(pCData, 'allUsers.nodes', [])
  const user = allUsers.find(u => u.name === username)
  const orgsUserIsPCWriter = get(user, 'organizationUsersByUserId.nodes', [])
    .filter(o => ['orgCollectionWriter', 'orgAdmin'].includes(o.role))
    .map(o => ({
      id: o.organizationId,
      name: get(o, 'organizationByOrganizationId.name', ''),
    }))
  const userIsPCWriter = orgsUserIsPCWriter.length > 0
  const userIsThisPCWriter =
    !!orgsUserIsPCWriter.find(o => o.id === pC.organizationId) ||
    (userIsPCWriter && !pC.organizationId)
  const idIsReferenced =
    get(pC, 'propertyCollectionObjectsByPropertyCollectionId.totalCount', 0) >
      0 ||
    get(pC, 'relationsByPropertyCollectionId.totalCount', 0) > 0 ||
    get(
      pC,
      'propertyCollectionObjectsByPropertyCollectionOfOrigin.totalCount',
      0
    ) > 0 ||
    get(pC, 'relationsByPropertyCollectionOfOrigin.totalCount', 0) > 0
  const importedBy = pC.importedBy
  const importedByUser = allUsers.find(u => u.id === importedBy)

  return (
    <ErrorBoundary>
      <Container>
        {userIsThisPCWriter &&
          editing && (
            <CardEditButton
              aria-label="Daten anzeigen"
              title="Daten anzeigen"
              onClick={event => {
                event.stopPropagation()
                client.mutate({
                  mutation: editingPCsMutation,
                  variables: { value: false },
                  optimisticResponse: {
                    setEditingPCs: {
                      editingPCs: false,
                      __typename: 'EditingPCs',
                    },
                    __typename: 'Mutation',
                  },
                })
              }}
            >
              <Icon>
                <ViewIcon />
              </Icon>
            </CardEditButton>
          )}
        {userIsThisPCWriter &&
          !editing && (
            <CardEditButton
              aria-label="Daten bearbeiten"
              title="Daten bearbeiten"
              onClick={event => {
                event.stopPropagation()
                client.mutate({
                  mutation: editingPCsMutation,
                  variables: { value: true },
                  optimisticResponse: {
                    setEditingPCs: {
                      editingPCs: true,
                      __typename: 'EditingPCs',
                    },
                    __typename: 'Mutation',
                  },
                })
              }}
            >
              <Icon>
                <EditIcon />
              </Icon>
            </CardEditButton>
          )}
        {!editing && (
          <Fragment>
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
              value={format(new Date(pC.lastUpdated), 'DD.MM.YYYY')}
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
          </Fragment>
        )}
        {editing && (
          <Fragment>
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
                <Fragment>
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
                    Kanton oder die ganze Schweiz erarbeitet?<br />
                    Dann bitte das entsprechende Kürzel voranstellen.
                  </span>
                  <br />
                  <span>Beispiel: "ZH Artwert (2000)".</span>
                </Fragment>
              }
            />
            <Property
              key={`${pC.id}/description`}
              label="Beschreibung"
              field="description"
              pC={pC}
              helperText={
                <Fragment>
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
                </Fragment>
              }
            />
            <StyledFormControl>
              <StyledLabel
                control={
                  <Checkbox
                    color="primary"
                    checked={pC.combining}
                    onChange={(event, isChecked) =>
                      onBlur({
                        client,
                        field: 'combining',
                        pC,
                        value: isChecked,
                        prevValue: pC.combining,
                      })
                    }
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
                  </StyledA>.
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
                <Fragment>
                  <span>
                    Z.B. zu Originalpublikation, erläuternde Webseite...
                  </span>
                  <br />
                  <br />
                  <span>
                    Mehrere Links können komma-getrennt erfasst werden.
                  </span>
                </Fragment>
              }
            />
            <StyledFormControl>
              <InputLabel htmlFor="organizationIdArten">
                Zuständige Organisation
              </InputLabel>
              <Select
                key={`${pC.id}/organizationId`}
                value={pC.organizationId || ''}
                onChange={event =>
                  onBlur({
                    client,
                    field: 'organizationId',
                    pC,
                    value: event.target.value,
                    prevValue: pC.organizationId,
                  })
                }
                input={<Input id="organizationIdArten" />}
              >
                {orgsUserIsPCWriter.map(o => (
                  <MenuItem key={o.id} value={o.id}>
                    {o.name}
                  </MenuItem>
                ))}
              </Select>
            </StyledFormControl>
            <StyledFormControl>
              <InputLabel htmlFor="importedByArten">Importiert von</InputLabel>
              <Select
                key={`${pC.id}/importedBy`}
                value={pC.importedBy}
                onChange={event =>
                  onBlur({
                    client,
                    field: 'importedBy',
                    pC,
                    value: event.target.value,
                    prevValue: pC.importedBy,
                  })
                }
                input={<Input id="importedByArten" />}
              >
                {allUsers.map(u => (
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
                <Fragment>
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
                </Fragment>
              }
            />
          </Fragment>
        )}
      </Container>
    </ErrorBoundary>
  )
}

export default enhance(PropertyCollection)
