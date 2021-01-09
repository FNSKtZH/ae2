import React, { useContext } from 'react'
import get from 'lodash/get'
import sortBy from 'lodash/sortBy'
import styled from 'styled-components'
import { useQuery, gql } from '@apollo/client'
import { observer } from 'mobx-react-lite'
import { getSnapshot } from 'mobx-state-tree'

import appBaseUrl from '../../modules/appBaseUrl'
import mobxStoreContext from '../../mobxStoreContext'
import Spinner from '../shared/Spinner'
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
  cursor: pointer;
  text-decoration-color: rgba(0, 0, 0, 0.3);
  text-decoration-style: dotted;
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
  const mobxStore = useContext(mobxStoreContext)
  const activeNodeArray = getSnapshot(mobxStore.activeNodeArray)
  const name = activeNodeArray.length > 1 ? activeNodeArray[1] : 'none'

  const { data: tcsData, loading: tcsLoading, error: tcsError } = useQuery(
    tcsQuery,
    {
      variables: {
        name,
      },
    },
  )

  const tcs = sortBy(
    get(tcsData, 'organizationByName.taxonomiesByOrganizationId.nodes', []),
    'name',
  )

  if (tcsLoading) return <Spinner />
  if (tcsError) return <Container>{`Fehler: ${tcsError.message}`}</Container>

  return (
    <ErrorBoundary>
      <Container>
        <List>
          <ul>
            {tcs.map((u) => {
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

export default observer(TCs)
