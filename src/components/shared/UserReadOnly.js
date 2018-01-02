// @flow
import React from 'react'
import styled from 'styled-components'
import Linkify from 'react-linkify'

import appBaseUrl from '../../modules/appBaseUrl'

const Container = styled.div`
  display: flex;
`
const Label = styled.p`
  flex-basis: 250px;
  text-align: right;
  padding-right: 5px;
  margin: 3px 0;
  padding: 2px;
  color: grey;
`
const UserContainer = styled.div`
  margin: 3px 0;
  padding: 2px;
  width: 100%;
`
const StyledA = styled.a`
  color: inherit;
  fontweight: 100;
  cursor: pointer;
`
const linkifyProperties = {
  target: '_blank',
  style: {
    color: 'inherit',
    fontWeight: 100,
    cursor: 'pointer',
  },
}

const UserReadOnly = ({ label, user }: { label: string, user: Object }) => {
  const { name, email } = user
  const link = `${appBaseUrl}/Benutzer/${encodeURIComponent(name)}`

  return (
    <Linkify properties={linkifyProperties}>
      <Container className="property">
        <Label>{`${label}:`}</Label>
        <UserContainer>
          <StyledA href={link} target="_blank">
            {name}
          </StyledA>
          <span>{` (${email})`}</span>
        </UserContainer>
      </Container>
    </Linkify>
  )
}

export default UserReadOnly