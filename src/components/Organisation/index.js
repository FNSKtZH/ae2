// @flow
import React from 'react'
import compose from 'recompose/compose'
import styled from 'styled-components'
import get from 'lodash/get'
import { Tabs, Tab } from 'material-ui/Tabs'

import activeNodeArrayData from '../../modules/activeNodeArrayData'
import orgData from './orgData'
import PropertyReadOnly from '../shared/PropertyReadOnly'
import UserReadOnly from '../shared/UserReadOnly'
import OrgUsers from './OrgUsers'
import TCs from './TCs'
import PCs from './PCs'
import ErrorBoundary from '../shared/ErrorBoundary'

const enhance = compose(activeNodeArrayData, orgData)

const Container = styled.div``
const OrgContainer = styled.div`
  padding: 10px;
`
const StyledTabs = styled(Tabs)`
  > div {
    background-color: transparent !important;
    > button {
      color: grey !important;
    }
  }
`
const tabButtonStyle = { whiteSpace: 'normal' }
const tabInkBarStyle = { backgroundColor: 'rgb(230, 81, 0)' }

const Organization = ({ orgData }: { orgData: Object }) => {
  const { loading } = orgData
  if (loading) {
    return <Container>Lade Daten...</Container>
  }
  const org = get(orgData, 'organizationByName', {})

  return (
    <ErrorBoundary>
      <Container>
        <OrgContainer>
          <PropertyReadOnly key="name" value={org.name} label="Name" />
          <PropertyReadOnly
            key="links"
            value={org.links ? org.links.join(', ') : ''}
            label="Link(s)"
          />
          <UserReadOnly
            key="contact"
            user={org.userByContact}
            label="Kontakt"
          />
        </OrgContainer>
        <StyledTabs inkBarStyle={tabInkBarStyle}>
          <Tab label="Benutzer mit Rollen" buttonStyle={tabButtonStyle}>
            <OrgUsers key={org.id} />
          </Tab>
          <Tab label="Taxonomien" buttonStyle={tabButtonStyle}>
            <TCs />
          </Tab>
          <Tab label="Eigenschaften-Sammlungen" buttonStyle={tabButtonStyle}>
            <PCs />
          </Tab>
        </StyledTabs>
      </Container>
    </ErrorBoundary>
  )
}

export default enhance(Organization)
