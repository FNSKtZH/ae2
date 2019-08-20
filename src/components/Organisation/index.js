import React, { useState, useCallback, useContext } from 'react'
import styled from 'styled-components'
import get from 'lodash/get'
import Paper from '@material-ui/core/Paper'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import { observer } from 'mobx-react-lite'
import ErrorBoundary from 'react-error-boundary'

import PropertyReadOnly from '../shared/PropertyReadOnly'
import UserReadOnly from '../shared/UserReadOnly'
import OrgUsers from './OrgUsers'
import TCs from './TCs'
import PCs from './PCs'
import mobxStoreContext from '../../mobxStoreContext'

const Container = styled.div``
const OrgContainer = styled.div`
  padding: 10px;
`
const StyledPaper = styled(Paper)`
  background-color: #ffcc80 !important;
`

const orgQuery = gql`
  query orgQuery($orgName: String!) {
    organizationByName(name: $orgName) {
      id
      name
      links
      contact
      userByContact {
        id
        name
        email
      }
      propertyCollectionsByOrganizationId {
        totalCount
        nodes {
          id
          name
        }
      }
      taxonomiesByOrganizationId {
        totalCount
        nodes {
          id
          name
        }
      }
      organizationUsersByOrganizationId {
        totalCount
        nodes {
          id
          userByUserId {
            id
            name
            email
          }
          role
        }
      }
    }
  }
`

const Organization = () => {
  const mobxStore = useContext(mobxStoreContext)
  const activeNodeArray = mobxStore.activeNodeArray.toJS()

  const { data: orgData, loading: orgLoading, error: orgError } = useQuery(
    orgQuery,
    {
      variables: {
        orgName: activeNodeArray[1],
      },
    },
  )

  const [tab, setTab] = useState(0)

  const onChangeTab = useCallback((event, value) => {
    setTab(value)
  }, [])

  const org = get(orgData, 'organizationByName', {})

  if (orgLoading) {
    return <Container>Lade Daten...</Container>
  }
  if (orgError) {
    return <Container>{`Fehler: ${orgError.message}`}</Container>
  }

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
            variant="fullWidth"
            value={tab}
            onChange={onChangeTab}
            indicatorColor="primary"
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

export default observer(Organization)
