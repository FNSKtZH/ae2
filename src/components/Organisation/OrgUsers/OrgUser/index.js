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
import orgUsersData from '../orgUsersData'
import AutocompleteFromArray from '../../../shared/AutocompleteFromArray'
import updateOrgUserMutation from '../updateOrgUserMutation'
import deleteOrgUserMutation from '../deleteOrgUserMutation'
import ErrorBoundary from '../../../shared/ErrorBoundary'

const OrgUserDiv = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: flex-end;
`

const enhance = compose(withApollo, activeNodeArrayData, orgUsersData)

const OrgUsers = ({
  user,
  orgUsersData,
  client,
}: {
  user: Object,
  orgUsersData: Object,
  client: Object,
}) => {
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
      <OrgUserDiv>
        <AutocompleteFromArray
          label="Benutzer"
          valueText={get(user, 'userByUserId.name')}
          dataSource={userNames}
          updatePropertyInDb={val => {
            const userId = users.find(u => u.name === val).id
            client.mutate({
              mutation: updateOrgUserMutation,
              variables: {
                nodeId: user.nodeId,
                organizationId: user.organizationId,
                userId,
                role: user.role,
              },
            })
            orgUsersData.refetch()
          }}
        />
        <AutocompleteFromArray
          label="Rolle"
          valueText={user.role}
          dataSource={roles}
          updatePropertyInDb={role => {
            client.mutate({
              mutation: updateOrgUserMutation,
              variables: {
                nodeId: user.nodeId,
                organizationId: user.organizationId,
                userId: user.userId,
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
                id: user.id,
              },
            })
          }}
        >
          <ContentClear color={red500} />
        </IconButton>
      </OrgUserDiv>
    </ErrorBoundary>
  )
}

export default enhance(OrgUsers)
