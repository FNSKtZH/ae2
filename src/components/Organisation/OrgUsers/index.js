// @flow
import React from 'react'
import compose from 'recompose/compose'
import styled from 'styled-components'
import get from 'lodash/get'
import { withApollo } from 'react-apollo'

import activeNodeArrayData from '../../../modules/activeNodeArrayData'
import orgUsersData from './orgUsersData'
import AutocompleteFromArray from '../../shared/AutocompleteFromArray'
import updateOrgUserMutation from './updateOrgUserMutation'

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
    .map(u => u.name)
    .sort()
  const roles = get(orgUsersData, 'allRoles.nodes', [])
    .map(u => u.name)
    .sort()
  const organizationId = get(orgUsersData, 'organizationByName.id')

  return (
    <Container>
      <Label>Benutzer mit Rollen:</Label>
      <List>
        {orgUsers.map(u => {
          const key = `${get(u, 'userByUserId.id')}/${u.role}`
          return (
            <div key={key}>
              <AutocompleteFromArray
                label="Benutzer"
                valueText={get(u, 'userByUserId.name')}
                dataSource={users}
                updatePropertyInDb={val => {
                  const userId = users.find(u => u.name === val).id
                  client.mutate({
                    mutation: updateOrgUserMutation,
                    variables: {
                      nodeId: u.nodeId,
                      organizationId,
                      userId,
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
                      organizationId,
                      userId: get(u, 'userByUserId.id'),
                      role,
                    },
                  })
                }}
              />
            </div>
          )
        })}
      </List>
    </Container>
  )
}

export default enhance(OrgUsers)
