// @flow
import React from 'react'
import compose from 'recompose/compose'
import styled from 'styled-components'
import get from 'lodash/get'
import { withApollo } from 'react-apollo'
import IconButton from 'material-ui/IconButton'
import Icon from 'material-ui/Icon'
import ClearIcon from 'material-ui-icons/Clear'
import Select from 'material-ui/Select'
import { MenuItem } from 'material-ui/Menu'
import { FormControl } from 'material-ui/Form'
import Input, { InputLabel } from 'material-ui/Input'
import set from 'lodash/set'

import activeNodeArrayData from '../../../../modules/activeNodeArrayData'
import updateOrgUserMutation from '../updateOrgUserMutation'
import deleteOrgUserMutation from '../deleteOrgUserMutation'
import ErrorBoundary from '../../../shared/ErrorBoundary'
import orgUsersGql from '../orgUsersGql'

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
const StyledFormControl = styled(FormControl)`
  margin: 10px 0 5px 0 !important;
  width: calc(50% - 24px);
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
      role: orgUser.role || null,
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
          <StyledFormControl>
            <InputLabel htmlFor="Benutzer">Benutzer</InputLabel>
            <Select
              value={userName}
              onChange={async event => {
                const val = event.target.value
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
                  this.setState({ userId: user.id })
                }
              }}
              input={<Input id="Benutzer" />}
            >
              {userNames.map(u => (
                <MenuItem key={u} value={u}>
                  {u}
                </MenuItem>
              ))}
            </Select>
          </StyledFormControl>
          <StyledFormControl>
            <InputLabel htmlFor="Rolle">Rolle</InputLabel>
            <Select
              value={this.state.role || ''}
              onChange={async event => {
                const role = event.target.value
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
              input={<Input id="Rolle" />}
            >
              {roles.map(u => (
                <MenuItem key={u} value={u}>
                  {u}
                </MenuItem>
              ))}
            </Select>
          </StyledFormControl>
          <DeleteButton
            title="löschen"
            aria-label="löschen"
            onClick={async () => {
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
                  const data = proxy.readQuery({
                    query: orgUsersGql,
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
                    query: orgUsersGql,
                    variables: { name: orgName },
                    data,
                  })
                },
              })
            }}
          >
            <Icon>
              <ClearIcon color="error" />
            </Icon>
          </DeleteButton>
        </OrgUserDiv>
      </ErrorBoundary>
    )
  }
}

export default enhance(OrgUser)
