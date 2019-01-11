// @flow
import React from 'react'
import get from 'lodash/get'
import sortBy from 'lodash/sortBy'
import styled from 'styled-components'
import { useQuery } from 'react-apollo-hooks'
import gql from 'graphql-tag'

import appBaseUrl from '../../modules/appBaseUrl'
import ErrorBoundary from '../shared/ErrorBoundary'

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
const StyledA = styled.a`
  color: inherit;
  font-weight: 100;
  cursor: pointer;
  text-decoration-color: rgba(0, 0, 0, 0.3);
  text-decoration-style: dotted;
`

const storeQuery = gql`
  query activeNodeArrayQuery {
    activeNodeArray @client
  }
`
const tcsQuery = gql`
  query orgTCsQuery($name: String!) {
    organizationByName(name: $name) {
      id
      taxonomiesByOrganizationId {
        totalCount
        nodes {
          id
          name
        }
      }
    }
  }
`

const TCs = () => {
  const { data: storeData } = useQuery(storeQuery, {
    suspend: false,
  })
  const { data: tcsData, loading: tcsLoading, error: tcsError } = useQuery(
    tcsQuery,
    {
      suspend: false,
      variables: {
        name: get(storeData, 'activeNodeArray', ['none', 'none'])[1],
      },
    },
  )

  const tcs = sortBy(
    get(tcsData, 'organizationByName.taxonomiesByOrganizationId.nodes', []),
    'name',
  )

  if (tcsLoading) return <Container>Lade Daten...</Container>
  if (tcsError) return <Container>{`Fehler: ${tcsError.message}`}</Container>

  return (
    <ErrorBoundary>
      <Container>
        <List>
          <ul>
            {tcs.map(u => {
              const elem2 = u.type === 'ART' ? 'Arten' : 'Lebensräume'
              const link = `${appBaseUrl}/${encodeURIComponent(elem2)}/${u.id}`

              return (
                <li key={u.name}>
                  <StyledA href={link} target="_blank">
                    {u.name}
                  </StyledA>
                </li>
              )
            })}
          </ul>
        </List>
      </Container>
    </ErrorBoundary>
  )
}

export default TCs
