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
  padding: 10px;
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
  console.log('OrgUsers: orgUsers:', orgUsers)
  const orgUserSorted = sortBy(
    orgUsers,
    orgUser =>
      `${orgUser.userByUserId ? orgUser.userByUserId.name : 'zzzzz'}${
        orgUser.role ? orgUser.role : 'zzzzz'
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
        {orgUserSorted.map(orgUser => (
          <OrgUser
            orgUser={orgUser}
            orgUsersData={orgUsersData}
            key={`${orgUser.id}/${orgUser.role}`}
          />
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
      </Container>
    </ErrorBoundary>
  )
}

export default enhance(OrgUsers)
