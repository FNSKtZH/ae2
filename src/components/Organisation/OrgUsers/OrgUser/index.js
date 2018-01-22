// @flow
import React from 'react'
import compose from 'recompose/compose'
import styled from 'styled-components'
import get from 'lodash/get'
import { withApollo } from 'react-apollo'
import IconButton from 'material-ui/IconButton'
import ContentClear from 'material-ui/svg-icons/content/clear'
import { red500 } from 'material-ui/styles/colors'

import activeNodeArrayData from '../../../../modules/activeNodeArrayData'
import AutocompleteFromArrayNew from '../../../shared/AutocompleteFromArrayNew'
import updateOrgUserMutation from '../updateOrgUserMutation'
import deleteOrgUserMutation from '../deleteOrgUserMutation'
import ErrorBoundary from '../../../shared/ErrorBoundary'

const OrgUserDiv = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: flex-end;
  width: 100%;
`

const enhance = compose(withApollo, activeNodeArrayData)

const OrgUsers = ({
  orgUser,
  orgUsersData,
  client,
}: {
  orgUser: Object,
  orgUsersData: Object,
  client: Object,
}) => {
  const users = get(orgUsersData, 'allUsers.nodes', [])
  const userNames = users.map(u => u.name).sort()
  const roles = get(orgUsersData, 'allRoles.nodes', [])
    .map(role => role.name)
    .sort()
  const userName = get(orgUser, 'userByUserId.name')

  return (
    <ErrorBoundary>
      <OrgUserDiv>
        <AutocompleteFromArrayNew
          label="Benutzer"
          value={userName}
          values={userNames}
          updatePropertyInDb={val => {
            const user = users.find(u => u.name === val)
            if (user && user.id) {
              client.mutate({
                mutation: updateOrgUserMutation,
                variables: {
                  nodeId: orgUser.nodeId,
                  organizationId: orgUser.organizationId,
                  userId: user.id,
                  role: orgUser.role,
                },
              })
              orgUsersData.refetch()
            }
          }}
        />
        <AutocompleteFromArrayNew
          label="Rolle"
          value={orgUser.role}
          values={roles}
          updatePropertyInDb={role => {
            client.mutate({
              mutation: updateOrgUserMutation,
              variables: {
                nodeId: orgUser.nodeId,
                organizationId: orgUser.organizationId,
                userId: orgUser.userId,
                role: role,
              },
            })
          }}
        />
        <IconButton
          tooltip="löschen"
          onClick={() => {
            client.mutate({
              mutation: deleteOrgUserMutation,
              variables: {
                id: orgUser.id,
              },
            })
            orgUsersData.refetch()
          }}
        >
          <ContentClear color={red500} />
        </IconButton>
      </OrgUserDiv>
    </ErrorBoundary>
  )
}

export default enhance(OrgUsers)
