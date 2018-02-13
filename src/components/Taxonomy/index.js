// @flow
import React, { Fragment } from 'react'
import compose from 'recompose/compose'
import IconButton from 'material-ui/IconButton'
import Icon from 'material-ui/Icon'
import EditIcon from 'material-ui-icons/Edit'
import ViewIcon from 'material-ui-icons/Visibility'
import Select from 'material-ui/Select'
import { MenuItem } from 'material-ui/Menu'
import Input, { InputLabel } from 'material-ui/Input'
import { FormControl } from 'material-ui/Form'
import styled from 'styled-components'
import get from 'lodash/get'
import format from 'date-fns/format'
import { withApollo } from 'react-apollo'

import activeNodeArrayData from '../../modules/activeNodeArrayData'
import editingTaxonomiesData from '../../modules/editingTaxonomiesData'
import editingTaxonomiesMutation from '../../modules/editingTaxonomiesMutation'
import loginData from '../../modules/loginData'
import taxData from './taxData'
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
  activeNodeArrayData,
  taxData,
  loginData,
  editingTaxonomiesData
)

const Taxonomy = ({
  client,
  taxData,
  editingTaxonomiesData,
  loginData,
}: {
  client: Object,
  taxData: Object,
  editingTaxonomiesData: Object,
  loginData: Object,
}) => {
  const { loading } = taxData
  if (loading) {
    return <Container>Lade Daten...</Container>
  }
  const tax = get(taxData, 'taxonomyById', {})
  const importedByName = get(tax, 'userByImportedBy.name')
  const organizationName = get(tax, 'organizationByOrganizationId.name')
  const editing = get(editingTaxonomiesData, 'editingTaxonomies', false)
  const editingArten = editing && tax.type === 'ART'
  const editingLr = editing && tax.type === 'LEBENSRAUM'
  const username = get(loginData, 'login.username', null)
  const allUsers = get(taxData, 'allUsers.nodes', [])
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

  return (
    <ErrorBoundary>
      <Container>
        {userIsThisTaxWriter &&
          editing && (
            <CardEditButton
              aria-label="Daten anzeigen"
              title="Daten anzeigen"
              onClick={event => {
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
              }}
            >
              <Icon>
                <ViewIcon />
              </Icon>
            </CardEditButton>
          )}
        {userIsThisTaxWriter &&
          !editing && (
            <CardEditButton
              aria-label="Daten bearbeiten"
              title="Daten bearbeiten"
              onClick={event => {
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
              }}
            >
              <Icon>
                <EditIcon />
              </Icon>
            </CardEditButton>
          )}
        {!editing && (
          <Fragment>
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
          </Fragment>
        )}
        {editingArten && (
          <Fragment>
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
                onChange={event =>
                  onBlurArten({
                    client,
                    field: 'importedBy',
                    taxonomy: tax,
                    value: event.target.value,
                    prevValue: tax.importedBy,
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
            <StyledFormControl>
              <InputLabel htmlFor="organizationIdArten">
                Zuständige Organisation
              </InputLabel>
              <Select
                key={`${tax.id}/organizationId`}
                value={tax.organizationId || ''}
                onChange={event =>
                  onBlurArten({
                    client,
                    field: 'organizationId',
                    taxonomy: tax,
                    value: event.target.value,
                    prevValue: tax.organizationId,
                  })
                }
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
          </Fragment>
        )}
        {editingLr && (
          <Fragment>
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
                onChange={event =>
                  onBlurLr({
                    client,
                    field: 'importedBy',
                    taxonomy: tax,
                    value: event.target.value,
                    prevValue: tax.importedBy,
                  })
                }
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
                onChange={event =>
                  onBlurLr({
                    client,
                    field: 'organizationId',
                    taxonomy: tax,
                    value: event.target.value,
                    prevValue: tax.organizationId,
                  })
                }
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
          </Fragment>
        )}
      </Container>
    </ErrorBoundary>
  )
}

export default enhance(Taxonomy)
