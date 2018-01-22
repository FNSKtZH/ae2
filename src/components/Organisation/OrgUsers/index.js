// @flow
import React from 'react'
import compose from 'recompose/compose'
import styled from 'styled-components'
import get from 'lodash/get'
import sortBy from 'lodash/sortBy'
import { withApollo } from 'react-apollo'
import IconButton from 'material-ui/IconButton'
import ContentAdd from 'material-ui/svg-icons/content/add'
import { red500 } from 'material-ui/styles/colors'

import activeNodeArrayData from '../../../modules/activeNodeArrayData'
import orgUsersData from './orgUsersData'
import createOrgUserMutation from './createOrgUserMutation'
import ErrorBoundary from '../../shared/ErrorBoundary'
import OrgUser from './OrgUser'

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
const AddNewButton = styled(IconButton)`
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
  const orgUserSorted = sortBy(
    orgUsers,
    user =>
      `${user.userByUserId ? user.userByUserId.name : 'zzzzz'}${
        user.role ? user.role : 'zzzzz'
      }`
  )
  const organizationId = get(
    orgUsersData,
    'organizationByName.id',
    '99999999-9999-9999-9999-999999999999'
  )
  /**
   * TODO: use state
   * initiate at componentDidMount
   * when mutating, use state values
   */

  return (
    <ErrorBoundary>
      <Container>
        <List>
          {orgUserSorted.map(user => (
            <OrgUser user={user} key={`${user.id}/${user.role}`} />
          ))}
          <AddNewButton
            tooltip="Neue Rolle vergeben"
            tooltipPosition="top-right"
            onClick={async () => {
              await client.mutate({
                mutation: createOrgUserMutation,
                variables: {
                  organizationId,
                },
              })
              orgUsersData.refetch()
            }}
          >
            <ContentAdd color={red500} />
          </AddNewButton>
        </List>
      </Container>
    </ErrorBoundary>
  )
}

export default enhance(OrgUsers)
