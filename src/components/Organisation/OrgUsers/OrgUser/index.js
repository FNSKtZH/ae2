// @flow
import React from 'react'
import compose from 'recompose/compose'
import styled from 'styled-components'
import get from 'lodash/get'
import { withApollo } from 'react-apollo'
import IconButton from 'material-ui-next/IconButton'
import ClearIcon from 'material-ui-icons/Clear'
import red from 'material-ui-next/colors/red'
import set from 'lodash/set'
import gql from 'graphql-tag'

import activeNodeArrayData from '../../../../modules/activeNodeArrayData'
import AutocompleteFromArray from '../../../shared/AutocompleteFromArray'
import updateOrgUserMutation from '../updateOrgUserMutation'
import deleteOrgUserMutation from '../deleteOrgUserMutation'
import ErrorBoundary from '../../../shared/ErrorBoundary'
import orgUsersDataQuery from '../orgUsersData'

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
    const orgName = get(orgUsersData, 'organizationByName.name', '')
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
              console.log('go!')
              client.mutate({
                mutation: deleteOrgUserMutation,
                variables: {
                  id: orgUser.id,
                },
                optimisticResponse: {
                  deleteOrganizationUserById: {
                    organizationUser: {
                      id: orgUser.id,
                      __typename: 'OrganizationUser',
                    },
                    __typename: 'Mutation',
                  },
                },
                update: (proxy, { data: { deleteOrgUserMutation } }) => {
                  const query = gql`
                    query orgUsersQuery($name: String!) {
                      organizationByName(name: $name) {
                        id
                        organizationUsersByOrganizationId {
                          totalCount
                          nodes {
                            id
                            organizationId
                            userId
                            nodeId
                            userByUserId {
                              id
                              name
                            }
                            role
                          }
                        }
                      }
                      allUsers {
                        nodes {
                          id
                          name
                        }
                      }
                      allRoles {
                        nodes {
                          name
                        }
                      }
                    }
                  `
                  const data = proxy.readQuery({
                    query,
                    variables: { name: orgName },
                  })
                  const orgUsers = get(
                    data,
                    'organizationByName.organizationUsersByOrganizationId.nodes',
                    []
                  )
                  const newOrgUsers = orgUsers.filter(u => u.id !== orgUser.id)
                  set(
                    data,
                    'organizationByName.organizationUsersByOrganizationId.nodes',
                    newOrgUsers
                  )
                  proxy.writeQuery({
                    query,
                    variables: { name: orgName },
                    data,
                  })
                },
              })
              //await orgUsersData.refetch()
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
