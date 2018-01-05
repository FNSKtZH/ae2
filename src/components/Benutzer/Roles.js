// @flow
import React from 'react'
import get from 'lodash/get'
import styled from 'styled-components'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 10px;
`
const List = styled.div`
  column-width: 400px;
  margin-bottom: 10px;
  ul {
    -webkit-margin-before: 0px;
  }
`

const Roles = ({ orgUsers }: { orgUsers: Array<Object> }) => (
  <Container>
    <List>
      <ul>
        {orgUsers.map(u => {
          const orgName = get(u, 'organizationByOrganizationId.name', '')
          const role = get(u, 'role', '')
          const val = `${orgName}: ${role}`
          return <li key={val}>{val}</li>
        })}
      </ul>
    </List>
  </Container>
)

export default Roles
