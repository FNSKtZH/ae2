// @flow
import React, { useCallback } from 'react'
import compose from 'recompose/compose'
import styled from 'styled-components'
import get from 'lodash/get'
import sortBy from 'lodash/sortBy'
import { withApollo } from 'react-apollo'
import IconButton from '@material-ui/core/IconButton'
import Icon from '@material-ui/core/Icon'
import AddIcon from '@material-ui/icons/Add'

import withActiveNodeArrayData from '../../../modules/withActiveNodeArrayData'
import withOrgUsersData from './withOrgUsersData'
import createOrgUserMutation from './createOrgUserMutation'
import ErrorBoundary from '../../shared/ErrorBoundary'
import OrgUsersList from './OrgUsersList'

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

const enhance = compose(
  withApollo,
  withActiveNodeArrayData,
  withOrgUsersData,
)

const OrgUsers = ({
  orgUsersData,
  client,
}: {
  orgUsersData: Object,
  client: Object,
}) => {
  const { loading, error } = orgUsersData

  const orgUsers = get(
    orgUsersData,
    'organizationByName.organizationUsersByOrganizationId.nodes',
    [],
  )
  const orgUserSorted = sortBy(
    orgUsers,
    orgUser =>
      `${orgUser.userByUserId ? orgUser.userByUserId.name : 'zzzzz'}${
        orgUser.role ? orgUser.role : 'zzzzz'
      }`,
  )
  const organizationId = get(
    orgUsersData,
    'organizationByName.id',
    '99999999-9999-9999-9999-999999999999',
  )

  const onClickNew = useCallback(
    async () => {
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
    },
    [organizationId],
  )

  if (loading) return <Container>Lade Daten...</Container>
  if (error) return <Container>`Fehler: ${error.message}`</Container>

  return (
    <ErrorBoundary>
      <Container>
        <OrgUsersList orgUsers={orgUserSorted} />
        <AddNewButton
          title="Neuen Benutzer mit Rolle erstellen"
          aria-label="Neue Rolle vergeben"
          onClick={onClickNew}
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
