// @flow
import React from 'react'
import compose from 'recompose/compose'
import styled from 'styled-components'
import get from 'lodash/get'
import sortBy from 'lodash/sortBy'
import { withApollo } from 'react-apollo'
import IconButton from 'material-ui/IconButton'
import ContentClear from 'material-ui/svg-icons/content/clear'
import { red500 } from 'material-ui/styles/colors'

import activeNodeArrayData from '../../../modules/activeNodeArrayData'
import orgUsersData from './orgUsersData'
import AutocompleteFromArray from '../../shared/AutocompleteFromArray'
import updateOrgUserMutation from './updateOrgUserMutation'
import deleteOrgUserMutation from './deleteOrgUserMutation'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 15px;
`
const Label = styled.div`
  color: rgba(0, 0, 0, 0.3);
  margin-bottom: -10px;
`
const List = styled.div`
  column-width: 400px;
  margin-bottom: 10px;
  ul {
    -webkit-margin-before: 0px;
  }
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
  console.log('users:', users)
  const roles = get(orgUsersData, 'allRoles.nodes', [])
    .map(u => u.name)
    .sort()

  return (
    <Container>
      <Label>Benutzer mit Rollen:</Label>
      <List>
        {sortBy(orgUsers, u => `${u.userByUserId.name}${u.role}`).map(u => {
          const key = `${get(u, 'userByUserId.id')}/${u.role}`
          console.log('u:', u)
          return (
            <div key={key}>
              <AutocompleteFromArray
                label="Benutzer"
                valueText={get(u, 'userByUserId.name')}
                dataSource={userNames}
                updatePropertyInDb={val => {
                  client.mutate({
                    mutation: updateOrgUserMutation,
                    variables: {
                      nodeId: u.nodeId,
                      organizationId: u.organizationId,
                      userId: u.userId,
                      role: u.role,
                    },
                  })
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
                  console.log('todo')
                  await client.mutate({
                    mutation: deleteOrgUserMutation,
                    variables: {
                      id: u.id,
                    },
                  })
                  orgUsersData.refetch()
                }}
              >
                <ContentClear color={red500} />
              </IconButton>
            </div>
          )
        })}
      </List>
    </Container>
  )
}

export default enhance(OrgUsers)
