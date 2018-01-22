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

type Props = {
  orgUser: Object,
  orgUsersData: Object,
  client: Object,
}

type State = {
  userId: string,
  role: string,
}

class OrgUser extends React.Component<Props, State> {
  constructor(props) {
    super(props)
    const { orgUser } = props
    this.state = {
      userId: orgUser.userId,
      role: orgUser.role || '',
    }
  }

  render() {
    const { orgUser, orgUsersData, client } = this.props
    // console.log('OrgUser: orgUser:', orgUser)
    const users = get(orgUsersData, 'allUsers.nodes', [])
    const user = users.find(user => user.id === this.state.userId)
    const userName = user ? user.name || '' : ''
    const userNames = users.map(u => u.name).sort()
    const roles = get(orgUsersData, 'allRoles.nodes', [])
      .map(role => role.name)
      .sort()

    return (
      <ErrorBoundary>
        <OrgUserDiv>
          <AutocompleteFromArrayNew
            label="Benutzer"
            value={userName}
            values={userNames}
            updatePropertyInDb={val => {
              console.log('val:', val)
              const user = users.find(u => u.name === val)
              if (user && user.id) {
                this.setState({ userId: user.id })
                const variables = {
                  nodeId: orgUser.nodeId,
                  organizationId: orgUser.organizationId,
                  userId: user.id,
                  role: this.state.role,
                }
                console.log('variables:', variables)
                client.mutate({
                  mutation: updateOrgUserMutation,
                  variables,
                })
              }
            }}
          />
          <AutocompleteFromArrayNew
            label="Rolle"
            value={this.state.role}
            values={roles}
            updatePropertyInDb={role => {
              console.log('role:', role)
              this.setState({ role })
              const variables = {
                nodeId: orgUser.nodeId,
                organizationId: orgUser.organizationId,
                userId: this.state.userId,
                role: role,
              }
              console.log('variables:', variables)
              client.mutate({
                mutation: updateOrgUserMutation,
                variables,
              })
            }}
          />
          <IconButton
            tooltip="löschen"
            onClick={() => {
              console.log('orgUser to delete:', orgUser)
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
}

export default enhance(OrgUser)
