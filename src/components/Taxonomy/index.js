import React, { useCallback, useContext } from 'react'
import IconButton from '@material-ui/core/IconButton'
import Icon from '@material-ui/core/Icon'
import EditIcon from '@material-ui/icons/Edit'
import ViewIcon from '@material-ui/icons/Visibility'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'
import FormControl from '@material-ui/core/FormControl'
import styled from 'styled-components'
import get from 'lodash/get'
import format from 'date-fns/format'
import { useQuery, useApolloClient } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import { observer } from 'mobx-react-lite'

import PropertyReadOnly from '../shared/PropertyReadOnly'
import ErrorBoundary from '../shared/ErrorBoundary'
import PropertyArten from './PropertyArten'
import PropertyLr from './PropertyLr'
import onBlurArten from './onBlurArten'
import onBlurLr from './onBlurLr'
import mobxStoreContext from '../../mobxStoreContext'
import Spinner from '../shared/Spinner'

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
const taxQuery = gql`
  query taxQuery($taxId: UUID!) {
    taxonomyById(id: $taxId) {
      id
      name
      description
      links
      lastUpdated
      organizationId
      organizationByOrganizationId {
        id
        name
        organizationUsersByOrganizationId {
          nodes {
            id
            role
            userId
            userByUserId {
              id
              name
            }
          }
        }
      }
      importedBy
      userByImportedBy {
        id
        name
      }
      termsOfUse
      habitatLabel
      habitatComments
      habitatNrFnsMin
      habitatNrFnsMax
      type
    }
  }
`

const Taxonomy = () => {
  const client = useApolloClient()
  const mobxStore = useContext(mobxStoreContext)
  const { editingTaxonomies, setEditingTaxonomies, login } = mobxStore
  const activeNodeArray = mobxStore.activeNodeArray.toJS()
  const taxId =
    activeNodeArray.length > 0
      ? activeNodeArray[1]
      : '99999999-9999-9999-9999-999999999999'

  const {
    data: allUsersData,
    loading: allUsersLoading,
    error: allUsersError,
  } = useQuery(allUsersQuery)
  const { data: taxData, loading: taxLoading, error: taxError } = useQuery(
    taxQuery,
    {
      variables: {
        taxId,
      },
    },
  )

  const tax = get(taxData, 'taxonomyById', {})
  const importedByName = get(tax, 'userByImportedBy.name')
  const organizationName = get(tax, 'organizationByOrganizationId.name')
  const editing = editingTaxonomies
  const editingArten = editing && tax.type === 'ART'
  const editingLr = editing && tax.type === 'LEBENSRAUM'
  const { username } = login
  const allUsers = get(allUsersData, 'allUsers.nodes', [])
  const user = allUsers.find((u) => u.name === username)
  const orgsUserIsTaxWriter = get(user, 'organizationUsersByUserId.nodes', [])
    .filter((o) => ['orgTaxonomyWriter', 'orgAdmin'].includes(o.role))
    .map((o) => ({
      id: o.organizationId,
      name: get(o, 'organizationByOrganizationId.name', ''),
    }))
  const userIsTaxWriter = orgsUserIsTaxWriter.length > 0
  const userIsThisTaxWriter =
    !!orgsUserIsTaxWriter.find((o) => o.id === tax.organizationId) ||
    (userIsTaxWriter && !tax.organizationId)

  const onClickStopEditing = useCallback(
    (event) => {
      event.stopPropagation()
      setEditingTaxonomies(false)
    },
    [setEditingTaxonomies],
  )
  const onClickStartEditing = useCallback(
    (event) => {
      event.stopPropagation()
      setEditingTaxonomies(true)
    },
    [setEditingTaxonomies],
  )
  const onChangeImportedByArten = useCallback(
    (event) =>
      onBlurArten({
        client,
        field: 'importedBy',
        taxonomy: tax,
        value: event.target.value,
        prevValue: tax.importedBy,
      }),
    [client, tax],
  )
  const onChangeOrganizationArten = useCallback(
    (event) =>
      onBlurArten({
        client,
        field: 'organizationId',
        taxonomy: tax,
        value: event.target.value,
        prevValue: tax.organizationId,
      }),
    [client, tax],
  )
  const onChangeImportedByLr = useCallback(
    (event) =>
      onBlurLr({
        client,
        field: 'importedBy',
        taxonomy: tax,
        value: event.target.value,
        prevValue: tax.importedBy,
      }),
    [client, tax],
  )
  const onChangeOrganizationLr = useCallback(
    (event) =>
      onBlurLr({
        client,
        field: 'organizationId',
        taxonomy: tax,
        value: event.target.value,
        prevValue: tax.organizationId,
      }),
    [client, tax],
  )

  if (taxLoading || allUsersLoading) {
    return <Spinner />
  }
  if (taxError) {
    return <Container>{`Fehler: ${taxError.message}`}</Container>
  }
  if (allUsersError) {
    return <Container>{`Fehler: ${allUsersError.message}`}</Container>
  }

  return (
    <ErrorBoundary>
      <Container>
        {userIsThisTaxWriter && editing && (
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
        {userIsThisTaxWriter && !editing && (
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
        {!editing && (
          <>
            <PropertyReadOnly key="id" value={tax.id} label="ID" />
            {!!tax.name && (
              <PropertyReadOnly key="name" value={tax.name} label="Name" />
            )}
            {!!tax.description && (
              <PropertyReadOnly
                key="description"
                value={tax.description}
                label="Beschreibung"
              />
            )}
            {!!tax.links && (
              <PropertyReadOnly
                key="links"
                value={tax.links.join(', ')}
                label="Links"
              />
            )}
            {!!tax.lastUpdated && (
              <PropertyReadOnly
                key="lastUpdated"
                value={format(new Date(tax.lastUpdated), 'dd.MM.yyyy')}
                label="Zuletzt aktualisiert"
              />
            )}
            {!!tax.termsOfUse && (
              <PropertyReadOnly
                key="termsOfUse"
                value={tax.termsOfUse}
                label="Nutzungsbedingungen"
              />
            )}
            {!!importedByName && (
              <PropertyReadOnly
                key="userByImportedBy"
                value={importedByName}
                label="Importiert von"
              />
            )}
            {!!organizationName && (
              <PropertyReadOnly
                key="organizationByOrganizationId"
                value={organizationName}
                label="Zuständige Organisation"
              />
            )}
            {!!tax.habitatLabel && (
              <PropertyReadOnly
                key="habitatLabel"
                value={tax.habitatLabel}
                label="Label"
              />
            )}
            {!!tax.habitatNrFnsMin && (
              <PropertyReadOnly
                key="habitatNrFnsMin"
                value={tax.habitatNrFnsMin}
                label="FNS-Nr. von"
              />
            )}
            {!!tax.habitatNrFnsMax && (
              <PropertyReadOnly
                key="habitatNrFnsMax"
                value={tax.habitatNrFnsMax}
                label="FNS-Nr. bis"
              />
            )}
            {!!tax.habitatComments && (
              <PropertyReadOnly
                key="habitatComments"
                value={tax.habitatComments}
                label="Bemerkungen"
              />
            )}
          </>
        )}
        {editingArten && (
          <>
            <PropertyArten
              key={`${tax.id}/id`}
              label="ID"
              field="id"
              taxonomy={tax}
              disabled={true}
            />
            <PropertyArten
              key={`${tax.id}/name`}
              label="Name"
              field="name"
              taxonomy={tax}
            />
            <PropertyArten
              key={`${tax.id}/description`}
              label="Beschreibung"
              field="description"
              taxonomy={tax}
            />
            <StyledFormControl>
              <InputLabel htmlFor="importedByArten">Importiert von</InputLabel>
              <Select
                key={`${tax.id}/importedBy`}
                value={tax.importedBy}
                onChange={onChangeImportedByArten}
                input={<Input id="importedByArten" />}
              >
                {allUsers.map((u) => (
                  <MenuItem key={u.id} value={u.id}>
                    {u.name}
                  </MenuItem>
                ))}
              </Select>
            </StyledFormControl>
            <StyledFormControl>
              <InputLabel htmlFor="organizationIdArten">
                Zuständige Organisation
              </InputLabel>
              <Select
                key={`${tax.id}/organizationId`}
                value={tax.organizationId || ''}
                onChange={onChangeOrganizationArten}
                input={<Input id="organizationIdArten" />}
              >
                {orgsUserIsTaxWriter.map((o) => (
                  <MenuItem key={o.id} value={o.id}>
                    {o.name}
                  </MenuItem>
                ))}
              </Select>
            </StyledFormControl>
            <PropertyArten
              key={`${tax.id}/lastUpdated`}
              label="Zuletzt aktualisiert"
              field="lastUpdated"
              taxonomy={tax}
              disabled={true}
            />
            <PropertyArten
              key={`${tax.id}/termsOfUse`}
              label="Nutzungs-Bedingungen"
              field="termsOfUse"
              taxonomy={tax}
            />
          </>
        )}
        {editingLr && (
          <>
            <PropertyLr
              key={`${tax.id}/id`}
              label="ID"
              field="id"
              taxonomy={tax}
              disabled={true}
            />
            <PropertyLr
              key={`${tax.id}/name`}
              label="Name"
              field="name"
              taxonomy={tax}
            />
            <PropertyLr
              key={`${tax.id}/description`}
              label="Beschreibung"
              field="description"
              taxonomy={tax}
            />
            <StyledFormControl>
              <InputLabel htmlFor="importedByLr">Importiert von</InputLabel>
              <Select
                key={`${tax.id}/importedBy`}
                value={tax.importedBy}
                onChange={onChangeImportedByLr}
                input={<Input id="importedByLr" />}
              >
                {allUsers.map((u) => (
                  <MenuItem key={u.id} value={u.id}>
                    {u.name}
                  </MenuItem>
                ))}
              </Select>
            </StyledFormControl>
            <StyledFormControl>
              <InputLabel htmlFor="organizationIdLr">
                Zuständige Organisation
              </InputLabel>
              <Select
                key={`${tax.id}/organizationId`}
                value={tax.organizationId || ''}
                onChange={onChangeOrganizationLr}
                input={<Input id="organizationIdLr" />}
              >
                {orgsUserIsTaxWriter.map((o) => (
                  <MenuItem key={o.id} value={o.id}>
                    {o.name}
                  </MenuItem>
                ))}
              </Select>
            </StyledFormControl>
            <PropertyLr
              key={`${tax.id}/lastUpdated`}
              label="Zuletzt aktualisiert"
              field="lastUpdated"
              taxonomy={tax}
              disabled={true}
            />
            <PropertyLr
              key={`${tax.id}/termsOfUse`}
              label="Nutzungs-Bedingungen"
              field="termsOfUse"
              taxonomy={tax}
            />
            <PropertyLr
              key={`${tax.id}/habitatLabel`}
              label="Einheit-Abkürzung"
              field="habitatLabel"
              taxonomy={tax}
            />
            <PropertyLr
              key={`${tax.id}/habitatComments`}
              label="Bemerkungen"
              field="habitatComments"
              taxonomy={tax}
            />
            <PropertyLr
              key={`${tax.id}/habitatNrFnsMin`}
              label="Einheit-Nrn FNS von"
              field="habitatNrFnsMin"
              taxonomy={tax}
              type="number"
            />
            <PropertyLr
              key={`${tax.id}/habitatNrFnsMax`}
              label="Einheit-Nrn FNS bis"
              field="habitatNrFnsMax"
              taxonomy={tax}
              type="number"
            />
          </>
        )}
      </Container>
    </ErrorBoundary>
  )
}

export default observer(Taxonomy)
