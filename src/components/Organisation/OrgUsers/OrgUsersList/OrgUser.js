// @flow
import React, { useState, useCallback, useContext } from 'react'
import styled from 'styled-components'
import get from 'lodash/get'
import IconButton from '@material-ui/core/IconButton'
import Icon from '@material-ui/core/Icon'
import ClearIcon from '@material-ui/icons/Clear'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'
import set from 'lodash/set'
import { useQuery, useApolloClient } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import { observer } from 'mobx-react-lite'

import updateOrgUserMutation from './updateOrgUserMutation'
import deleteOrgUserMutation from './deleteOrgUserMutation'
import ErrorBoundary from '../../../shared/ErrorBoundary'
import mobxStoreContext from '../../../../mobxStoreContext'

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

const allUsersQuery = gql`
  query AllUsersQuery {
    allUsers {
      totalCount
      nodes {
        id
        name
        email
        organizationUsersByUserId {
          nodes {
            id
            organizationId
            role
            organizationByOrganizationId {
              id
              name
            }
          }
        }
      }
    }
  }
`
const orgUsersQuery = gql`
  query orgUsersQuery($name: String!) {
    organizationByName(name: $name) {
      id
      name
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
    allRoles {
      nodes {
        nodeId
        name
      }
    }
  }
`

const OrgUser = ({ orgUser }: { orgUser: Object }) => {
  const client = useApolloClient()
  const mobxStore = useContext(mobxStoreContext)
  const activeNodeArray = mobxStore.activeNodeArray.toJS()
  const name = activeNodeArray.length > 1 ? activeNodeArray[1] : 'none'

  const {
    data: allUsersData,
    loading: allUsersLoading,
    error: allUsersError,
  } = useQuery(allUsersQuery, {
    suspend: false,
  })
  const {
    data: orgUsersData,
    loading: orgUsersLoading,
    error: orgUsersError,
  } = useQuery(orgUsersQuery, {
    suspend: false,
    variables: {
      name,
    },
  })

  const [userId, setUserId] = useState(orgUser.userId)
  const [role, setRole] = useState(orgUser.role || null)

  const users = get(allUsersData, 'allUsers.nodes', [])
  const orgName = get(orgUsersData, 'organizationByName.name', '')
  const user = users.find(user => user.id === userId)
  const userName = user ? user.name || '' : ''
  const userNames = users.map(u => u.name).sort()
  const roles = get(orgUsersData, 'allRoles.nodes', [])
    .map(role => role.name)
    .sort()

  const onChangeName = useCallback(
    async e => {
      const val = e.target.value
      const user = users.find(u => u.name === val)
      if (user && user.id) {
        const variables = {
          nodeId: orgUser.nodeId,
          organizationId: orgUser.organizationId,
          userId: user.id,
          role,
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
                  role,
                  __typename: 'OrganizationUser',
                },
                __typename: 'Mutation',
              },
            },
          })
        } catch (error) {
          console.log(error)
          setUserId('')
        }
        setUserId(user.id)
      }
    },
    [users, orgUser.nodeId, orgUser.organizationId, orgUser.id, role, client],
  )
  const onChangeRole = useCallback(
    async event => {
      const newRole = event.target.value
      const variables = {
        nodeId: orgUser.nodeId,
        organizationId: orgUser.organizationId,
        userId,
        role: newRole,
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
                userId,
                role: newRole,
                __typename: 'OrganizationUser',
              },
              __typename: 'Mutation',
            },
          },
        })
      } catch (error) {
        // TODO: surface this message
        console.log('error.message:', error.message)
        setRole('')
      }
      setRole(newRole)
    },
    [client, orgUser.id, orgUser.nodeId, orgUser.organizationId, userId],
  )
  const onClickDelete = useCallback(async () => {
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
          query: orgUsersQuery,
          variables: { name: orgName },
        })
        const orgUsers = get(
          data,
          'organizationByName.organizationUsersByOrganizationId.nodes',
          [],
        )
        const newOrgUsers = orgUsers.filter(u => u.id !== orgUser.id)
        set(
          data,
          'organizationByName.organizationUsersByOrganizationId.nodes',
          newOrgUsers,
        )
        proxy.writeQuery({
          query: orgUsersQuery,
          variables: { name: orgName },
          data,
        })
      },
    })
  }, [client, orgName, orgUser.id])

  if (orgUsersLoading || allUsersLoading) {
    return <OrgUserDiv>Lade Daten...</OrgUserDiv>
  }
  if (orgUsersError) {
    return <OrgUserDiv>{`Fehler: ${orgUsersError.message}`}</OrgUserDiv>
  }
  if (allUsersError) {
    return <OrgUserDiv>{`Fehler: ${allUsersError.message}`}</OrgUserDiv>
  }

  return (
    <ErrorBoundary>
      <OrgUserDiv>
        <StyledFormControl>
          <InputLabel htmlFor="Benutzer">Benutzer</InputLabel>
          <Select
            value={userName}
            onChange={onChangeName}
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
            value={role || ''}
            onChange={onChangeRole}
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
          onClick={onClickDelete}
        >
          <Icon>
            <ClearIcon color="error" />
          </Icon>
        </DeleteButton>
      </OrgUserDiv>
    </ErrorBoundary>
  )
}

export default observer(OrgUser)
