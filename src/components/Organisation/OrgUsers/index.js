// @flow
import React from 'react'
import compose from 'recompose/compose'
import styled from 'styled-components'
import get from 'lodash/get'
import sortBy from 'lodash/sortBy'
import { withApollo } from 'react-apollo'
import IconButton from 'material-ui/IconButton'
import ContentClear from 'material-ui/svg-icons/content/clear'
import ContentAdd from 'material-ui/svg-icons/content/add'
import { red500 } from 'material-ui/styles/colors'

import activeNodeArrayData from '../../../modules/activeNodeArrayData'
import orgUsersData from './orgUsersData'
import AutocompleteFromArray from '../../shared/AutocompleteFromArray'
import updateOrgUserMutation from './updateOrgUserMutation'
import deleteOrgUserMutation from './deleteOrgUserMutation'
import createOrgUserMutation from './createOrgUserMutation'
import ErrorBoundary from '../../shared/ErrorBoundary'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: 10px;
  padding-right: 10px;
`
const List = styled.div`
  display: flex;
  flex-direction: column;
`
const OrgUserDiv = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: flex-end;
`
const DeleteButton = styled(IconButton)`
  top: 10px !important;
`

const enhance = compose(withApollo, activeNodeArrayData, orgUsersData)

const OrgUsers = ({
  orgUsersData,
  client,
}: {
  orgUsersData: Object,
  client: Object,
}) => {
  const orgUsers = get(
    orgUsersData,
    'organizationByName.organizationUsersByOrganizationId.nodes',
    []
  )
  const users = get(orgUsersData, 'allUsers.nodes', [])
  const userNames = users.map(u => u.name).sort()
  const roles = get(orgUsersData, 'allRoles.nodes', [])
    .map(u => u.name)
    .sort()
  /**
   * TODO: use state
   * initiate at componentDidMount
   * when mutating, use state values
   */

  return (
    <ErrorBoundary>
      <Container>
        <List>
          {sortBy(
            orgUsers,
            u =>
              `${u.userByUserId ? u.userByUserId.name : 'zzzzz'}${
                u.role ? u.role : 'zzzzz'
              }`
          ).map(u => (
            <OrgUserDiv key={`${get(u, 'userByUserId.id')}/${u.role}`}>
              <AutocompleteFromArray
                label="Benutzer"
                valueText={get(u, 'userByUserId.name')}
                dataSource={userNames}
                updatePropertyInDb={val => {
                  const userId = users.find(u => u.name === val).id
                  client.mutate({
                    mutation: updateOrgUserMutation,
                    variables: {
                      nodeId: u.nodeId,
                      organizationId: u.organizationId,
                      userId,
                      role: u.role,
                    },
                  })
                  orgUsersData.refetch()
                }}
              />
              <AutocompleteFromArray
                label="Rolle"
                valueText={u.role}
                dataSource={roles}
                updatePropertyInDb={role => {
                  client.mutate({
                    mutation: updateOrgUserMutation,
                    variables: {
                      nodeId: u.nodeId,
                      organizationId: u.organizationId,
                      userId: u.userId,
                      role,
                    },
                  })
                }}
              />
              <IconButton
                tooltip="löschen"
                onClick={async () => {
                  await client.mutate({
                    mutation: deleteOrgUserMutation,
                    variables: {
                      id: u.id,
                    },
                  })
                }}
              >
                <ContentClear color={red500} />
              </IconButton>
            </OrgUserDiv>
          ))}
          <DeleteButton
            tooltip="Neue Rolle vergeben"
            tooltipPosition="top-right"
            onClick={async () => {
              await client.mutate({
                mutation: createOrgUserMutation,
                variables: {
                  organizationId: get(
                    orgUsersData,
                    'organizationByName.id',
                    '99999999-9999-9999-9999-999999999999'
                  ),
                },
              })
              orgUsersData.refetch()
            }}
          >
            <ContentAdd color={red500} />
          </DeleteButton>
        </List>
      </Container>
    </ErrorBoundary>
  )
}

export default enhance(OrgUsers)
