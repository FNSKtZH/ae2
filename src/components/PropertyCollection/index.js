// @flow
import React, { Fragment } from 'react'
import compose from 'recompose/compose'
import IconButton from 'material-ui-next/IconButton'
import Icon from 'material-ui-next/Icon'
import EditIcon from 'material-ui-icons/Edit'
import ViewIcon from 'material-ui-icons/Visibility'
import Select from 'material-ui-next/Select'
import { MenuItem } from 'material-ui-next/Menu'
import Input, { InputLabel } from 'material-ui-next/Input'
import { FormControl } from 'material-ui-next/Form'
import { FormControlLabel } from 'material-ui-next/Form'
import Checkbox from 'material-ui-next/Checkbox'
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
              value={`${user.name} (${user.email})`}
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
              disabled={true}
            />
            <Property key={`${pC.id}/name`} label="Name" field="name" pC={pC} />
            <Property
              key={`${pC.id}/description`}
              label="Beschreibung"
              field="description"
              pC={pC}
            />
            <StyledLabel
              control={
                <Checkbox
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
            <Property
              key={`${pC.id}/lastUpdated`}
              label="Zuletzt aktualisiert"
              field="lastUpdated"
              pC={pC}
              disabled={true}
            />
            <Property
              key={`${pC.id}/links`}
              label="Links"
              field="links"
              pC={pC}
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
                    taxonomy: pC,
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
                    taxonomy: pC,
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
            />
          </Fragment>
        )}
      </Container>
    </ErrorBoundary>
  )
}

export default enhance(PropertyCollection)
