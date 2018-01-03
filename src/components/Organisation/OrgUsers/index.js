// @flow
import React from 'react'
import compose from 'recompose/compose'
import styled from 'styled-components'
import get from 'lodash/get'

import activeNodeArrayData from '../../../modules/activeNodeArrayData'
import orgUsersData from './orgUsersData'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 10px;
`
const Label = styled.div`
  color: rgba(0, 0, 0, 0.3);
  margin-bottom: 10px;
`
const List = styled.div`
  column-width: 400px;
  margin-bottom: 10px;
  ul {
    -webkit-margin-before: 0px;
  }
`

const enhance = compose(activeNodeArrayData, orgUsersData)

const OrgUsers = ({ orgUsersData }: { orgUsersData: Object }) => {
  const orgUsers = get(
    orgUsersData,
    'organizationByName.organizationUsersByOrganizationId.nodes',
    []
  )
  return (
    <Container>
      <Label>Benutzer mit Rollen:</Label>
      <List>
        {orgUsers.map(u => {
          const key = `${get(u, 'userByUserId.id')}/${u.role}`
          return (
            <div key={key}>
              <span>{get(u, 'userByUserId.name')}</span>
              <span>{u.role}</span>
            </div>
          )
        })}
      </List>
    </Container>
  )
}

export default enhance(OrgUsers)
