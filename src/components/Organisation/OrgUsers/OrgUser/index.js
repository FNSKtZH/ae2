// @flow
import React from 'react'
import compose from 'recompose/compose'
import styled from 'styled-components'
import get from 'lodash/get'
import { withApollo } from 'react-apollo'
import IconButton from 'material-ui-next/IconButton'
import ClearIcon from 'material-ui-icons/Clear'
import red from 'material-ui-next/colors/red'

import activeNodeArrayData from '../../../../modules/activeNodeArrayData'
import AutocompleteFromArray from '../../../shared/AutocompleteFromArray'
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
const DeleteButton = styled(IconButton)`
  :hover {
    font-weight: 700;
    background-color: rgba(0, 0, 0, 0.12);
    text-decoration: none;
  }
`

const enhance = compose(withApollo, activeNodeArrayData)

type Props = {
  orgUser: Object,
  orgUsersData: Object,
  orgData: Object,
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
    const { orgUser, orgUsersData, orgData, client } = this.props
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
          <AutocompleteFromArray
            label="Benutzer"
            value={userName}
            values={userNames}
            updatePropertyInDb={async val => {
              const user = users.find(u => u.name === val)
              if (user && user.id) {
                const variables = {
                  nodeId: orgUser.nodeId,
                  organizationId: orgUser.organizationId,
                  userId: user.id,
                  role: this.state.role,
                }
                try {
                  await client.mutate({
                    mutation: updateOrgUserMutation,
                    variables,
                    optimisticResponse: {
                      updateOrganizationUser: {
                        organizationUser: {
                          nodeId: orgUser.nodeId,
                          id: orgUser.id,
                          organizationId: orgUser.organizationId,
                          userId: user.id,
                          role: this.state.role,
                          __typename: 'OrganizationUser',
                        },
                        __typename: 'Mutation',
                      },
                    },
                  })
                } catch (error) {
                  console.log(error)
                  this.setState({ userId: '' })
                }
                console.log('done')
                this.setState({ userId: user.id })
              }
            }}
          />
          <AutocompleteFromArray
            label="Rolle"
            value={this.state.role}
            values={roles}
            updatePropertyInDb={async role => {
              const variables = {
                nodeId: orgUser.nodeId,
                organizationId: orgUser.organizationId,
                userId: this.state.userId,
                role: role,
              }
              try {
                await client.mutate({
                  mutation: updateOrgUserMutation,
                  variables,
                  optimisticResponse: {
                    updateOrganizationUser: {
                      organizationUser: {
                        nodeId: orgUser.nodeId,
                        id: orgUser.id,
                        organizationId: orgUser.organizationId,
                        userId: user.id,
                        role: this.state.role,
                        __typename: 'OrganizationUser',
                      },
                      __typename: 'Mutation',
                    },
                  },
                })
              } catch (error) {
                // TODO: surface this message
                console.log('error.message:', error.message)
                this.setState({ role: '' })
              }
              this.setState({ role })
            }}
          />
          <DeleteButton
            title="löschen"
            aria-label="löschen"
            onClick={async () => {
              client.mutate({
                mutation: deleteOrgUserMutation,
                variables: {
                  id: orgUser.id,
                },
              })
              await orgData.refetch()
              await orgUsersData.refetch()
            }}
          >
            <ClearIcon color={red[500]} />
          </DeleteButton>
        </OrgUserDiv>
      </ErrorBoundary>
    )
  }
}

export default enhance(OrgUser)
