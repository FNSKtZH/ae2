import React, { useCallback, useRef, useEffect } from 'react'
import GraphiQL from 'graphiql'
import get from 'lodash/get'
import 'graphiql/graphiql.css'
import styled from 'styled-components'
import ErrorBoundary from 'react-error-boundary'

import graphQlUri from '../../modules/graphQlUri'

const Container = styled.div`
  height: calc(100vh - 64px);
`
const LoadingContainer = styled.div`
  padding: 10px;
`

const GraphIql = ({ dataGraphData }) => {
  const loading = get(dataGraphData, 'loading', false)

  const myGraphiQL = useRef(null)
  const graphQLFetcher = useCallback(
    graphQLParams =>
      fetch(graphQlUri(), {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(graphQLParams),
      }).then(response => {
        // need to refresh due to issue in graphiql/it's dependencies
        // see: https://github.com/graphql/graphiql/issues/770#issuecomment-507943042
        myGraphiQL.current.refresh()
        return response.json()
      }),
    [],
  )

  // useEffect(() => {
  //   setTimeout(() => myGraphiQL.current.refresh(), 500)
  // }, [])

  if (loading) return <LoadingContainer>Lade Daten...</LoadingContainer>

  return (
    <ErrorBoundary>
      <Container>
        <GraphiQL ref={myGraphiQL} fetcher={graphQLFetcher} />
      </Container>
    </ErrorBoundary>
  )
}

export default GraphIql
