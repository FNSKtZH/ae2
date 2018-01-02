// @flow
import React from 'react'
import compose from 'recompose/compose'
import styled from 'styled-components'
import get from 'lodash/get'

import activeNodeArrayData from '../../modules/activeNodeArrayData'
import orgData from './orgData'
import PropertyReadOnly from '../shared/PropertyReadOnly'
import UserReadOnly from '../shared/UserReadOnly'

const enhance = compose(activeNodeArrayData, orgData)

const Container = styled.div`
  padding: 10px;
`

const Organization = ({ orgData }: { orgData: Object }) => {
  const { loading } = orgData
  if (loading) {
    return <Container>Lade Daten...</Container>
  }
  const org = get(orgData, 'organizationByName', {})

  return (
    <Container>
      <PropertyReadOnly key="name" value={org.name} label="Name" />
      <PropertyReadOnly
        key="links"
        value={org.links ? org.links.join(', ') : ''}
        label="Link(s)"
      />
      <UserReadOnly key="contact" user={org.userByContact} label="Kontakt" />
    </Container>
  )
}

export default enhance(Organization)
