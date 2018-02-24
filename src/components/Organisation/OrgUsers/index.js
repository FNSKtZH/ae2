// @flow
import React from 'react'
import compose from 'recompose/compose'
import styled from 'styled-components'
import get from 'lodash/get'
import sortBy from 'lodash/sortBy'
import { withApollo } from 'react-apollo'
import IconButton from 'material-ui/IconButton'
import Icon from 'material-ui/Icon'
import AddIcon from 'material-ui-icons/Add'

import activeNodeArrayData from '../../../modules/activeNodeArrayData'
import orgUsersData from './orgUsersData'
import createOrgUserMutation from './createOrgUserMutation'
import ErrorBoundary from '../../shared/ErrorBoundary'
import OrgUser from './OrgUser'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 5px;
`
const AddNewButton = styled(IconButton)`
  top: 10px !important;
  :hover {
    font-weight: 700;
    background-color: rgba(0, 0, 0, 0.12);
    text-decoration: none;
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
          title="Neuen Benutzer mit Rolle erstellen"
          aria-label="Neue Rolle vergeben"
          onClick={async () => {
            await client.mutate({
              mutation: createOrgUserMutation,
              variables: {
                organizationId,
              },
              /**
               * adding to cache seems to be darn hard
               * so just refetch
               */
            })
            orgUsersData.refetch()
          }}
        >
          <Icon>
            <AddIcon color="error" />
          </Icon>
        </AddNewButton>
      </Container>
    </ErrorBoundary>
  )
}

export default enhance(OrgUsers)
