// @flow
import React from 'react'
import compose from 'recompose/compose'
import withState from 'recompose/withState'
import withHandlers from 'recompose/withHandlers'
import styled from 'styled-components'
import get from 'lodash/get'
import Paper from '@material-ui/core/Paper'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'

import activeNodeArrayData from '../../modules/activeNodeArrayData'
import orgData from './orgData'
import PropertyReadOnly from '../shared/PropertyReadOnly'
import UserReadOnly from '../shared/UserReadOnly'
import OrgUsers from './OrgUsers'
import TCs from './TCs'
import PCs from './PCs'
import ErrorBoundary from '../shared/ErrorBoundary'

const enhance = compose(
  activeNodeArrayData,
  orgData,
  withState('tab', 'setTab', 0),
  withHandlers({
    onChangeTab: ({ setTab }) => (event, value) => {
      setTab(value)
    },
  })
)

const Container = styled.div``
const OrgContainer = styled.div`
  padding: 10px;
`
const StyledPaper = styled(Paper)`
  background-color: #ffcc80 !important;
`

const Organization = ({
  orgData,
  tab,
  setTab,
  onChangeTab,
  dimensions: { width },
}: {
  orgData: Object,
  tab: Number,
  setTab: () => void,
  onChangeTab: () => void,
  dimensions: Object,
}) => {
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
        <StyledPaper>
          <Tabs
            centered={width > 705}
            value={tab}
            onChange={onChangeTab}
            indicatorColor="primary"
            scrollable={width <= 705}
            scrollButtons="auto"
          >
            <Tab label="Benutzer mit Rollen" />
            <Tab label="Taxonomien" />
            <Tab label="Eigenschaften-Sammlungen" />
          </Tabs>
        </StyledPaper>
        {tab === 0 && <OrgUsers key={org.id} />}
        {tab === 1 && <TCs />}
        {tab === 2 && <PCs />}
      </Container>
    </ErrorBoundary>
  )
}

export default enhance(Organization)
