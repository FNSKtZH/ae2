// @flow
import React from 'react'
import get from 'lodash/get'
import styled from 'styled-components'

const Label = styled.div`
  color: rgba(0, 0, 0, 0.3);
  margin-bottom: 10px;
  margin-top: 10px;
`

const Roles = ({ orgUsers }: { orgUsers: Array<Object> }) => (
  <div>
    <Label>Rollen:</Label>
    <ul>
      {orgUsers.map(u => {
        const orgName = get(u, 'organizationByOrganizationId.name', '')
        const role = get(u, 'role', '')
        const val = `${orgName}: ${role}`
        return <li key={val}>{val}</li>
      })}
    </ul>
  </div>
)

export default Roles
