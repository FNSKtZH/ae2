// @flow
import React, { useCallback } from 'react'
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
import styled from 'styled-components'
import get from 'lodash/get'
import format from 'date-fns/format'
import { withApollo } from 'react-apollo'

import withActiveNodeArrayData from '../../modules/withActiveNodeArrayData'
import withEditingTaxonomiesData from '../../modules/withEditingTaxonomiesData'
import withAllUsersData from '../../modules/withAllUsersData'
import editingTaxonomiesMutation from '../../modules/editingTaxonomiesMutation'
import withLoginData from '../../modules/withLoginData'
import withTaxData from './withTaxData'
import PropertyReadOnly from '../shared/PropertyReadOnly'
import PropertyArten from './PropertyArten'
import PropertyLr from './PropertyLr'
import ErrorBoundary from '../shared/ErrorBoundary'
import onBlurArten from './onBlurArten'
import onBlurLr from './onBlurLr'

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

const enhance = compose(
  withApollo,
  withAllUsersData,
  withActiveNodeArrayData,
  withTaxData,
  withLoginData,
  withEditingTaxonomiesData,
)

const Taxonomy = ({
  client,
  allUsersData,
  taxData,
  editingTaxonomiesData,
  loginData,
}: {
  client: Object,
  allUsersData: Object,
  taxData: Object,
  editingTaxonomiesData: Object,
  loginData: Object,
}) => {
  const tax = get(taxData, 'taxonomyById', {})
  const importedByName = get(tax, 'userByImportedBy.name')
  const organizationName = get(tax, 'organizationByOrganizationId.name')
  const editing = get(editingTaxonomiesData, 'editingTaxonomies', false)
  const editingArten = editing && tax.type === 'ART'
  const editingLr = editing && tax.type === 'LEBENSRAUM'
  const username = get(loginData, 'login.username', null)
  const allUsers = get(allUsersData, 'allUsers.nodes', [])
  const user = allUsers.find(u => u.name === username)
  const orgsUserIsTaxWriter = get(user, 'organizationUsersByUserId.nodes', [])
    .filter(o => ['orgTaxonomyWriter', 'orgAdmin'].includes(o.role))
    .map(o => ({
      id: o.organizationId,
      name: get(o, 'organizationByOrganizationId.name', ''),
    }))
  const userIsTaxWriter = orgsUserIsTaxWriter.length > 0
  const userIsThisTaxWriter =
    !!orgsUserIsTaxWriter.find(o => o.id === tax.organizationId) ||
    (userIsTaxWriter && !tax.organizationId)

  const onClickStopEditing = useCallback(event => {
    event.stopPropagation()
    client.mutate({
      mutation: editingTaxonomiesMutation,
      variables: { value: false },
      optimisticResponse: {
        setEditingTaxonomies: {
          editingTaxonomies: false,
          __typename: 'EditingTaxonomies',
        },
        __typename: 'Mutation',
      },
    })
  })
  const onClickStartEditing = useCallback(event => {
    event.stopPropagation()
    client.mutate({
      mutation: editingTaxonomiesMutation,
      variables: { value: true },
      optimisticResponse: {
        setEditingTaxonomies: {
          editingTaxonomies: true,
          __typename: 'EditingTaxonomies',
        },
        __typename: 'Mutation',
      },
    })
  })
  const onChangeImportedByArten = useCallback(
    event =>
      onBlurArten({
        client,
        field: 'importedBy',
        taxonomy: tax,
        value: event.target.value,
        prevValue: tax.importedBy,
      }),
    [tax],
  )
  const onChangeOrganizationArten = useCallback(
    event =>
      onBlurArten({
        client,
        field: 'organizationId',
        taxonomy: tax,
        value: event.target.value,
        prevValue: tax.organizationId,
      }),
    [tax],
  )
  const onChangeImportedByLr = useCallback(
    event =>
      onBlurLr({
        client,
        field: 'importedBy',
        taxonomy: tax,
        value: event.target.value,
        prevValue: tax.importedBy,
      }),
    [tax],
  )
  const onChangeOrganizationLr = useCallback(
    event =>
      onBlurLr({
        client,
        field: 'organizationId',
        taxonomy: tax,
        value: event.target.value,
        prevValue: tax.organizationId,
      }),
    [tax],
  )

  if (
    taxData.loading ||
    allUsersData.loading ||
    editingTaxonomiesData.loading ||
    loginData.loading
  ) {
    return <Container>Lade Daten...</Container>
  }
  if (taxData.error) {
    return <Container>`Fehler: ${taxData.error.message}`</Container>
  }
  if (allUsersData.error) {
    return <Container>`Fehler: ${allUsersData.error.message}`</Container>
  }
  if (editingTaxonomiesData.error) {
    return (
      <Container>`Fehler: ${editingTaxonomiesData.error.message}`</Container>
    )
  }
  if (loginData.error) {
    return <Container>`Fehler: ${loginData.error.message}`</Container>
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
                value={format(new Date(tax.lastUpdated), 'DD.MM.YYYY')}
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
                {allUsers.map(u => (
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
                {orgsUserIsTaxWriter.map(o => (
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
                {allUsers.map(u => (
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
                {orgsUserIsTaxWriter.map(o => (
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

export default enhance(Taxonomy)
