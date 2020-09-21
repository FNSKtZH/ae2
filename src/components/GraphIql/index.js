import React, { useCallback } from 'react'
import GraphiQL from 'graphiql'
import get from 'lodash/get'
import 'graphiql/graphiql.css'
import styled from 'styled-components'

import graphQlUri from '../../modules/graphQlUri'
import Spinner from '../shared/Spinner'
import ErrorBoundary from '../shared/ErrorBoundary'

const Container = styled.div`
  height: calc(100vh - 64px);
`
// need to use ref to refresh GraphiQL after fetching params
// for grahpiQL to work in dev mode: https://github.com/graphql/graphiql/issues/770#issuecomment-560447339
// but id DOES work in production
const GraphIql = ({ dataGraphData }) => {
  const loading = get(dataGraphData, 'loading', false)

  const graphQLFetcher = useCallback(
    (graphQLParams) =>
      fetch(graphQlUri(), {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(graphQLParams),
      }).then((response) => response.json()),
    [],
  )

  if (loading) return <Spinner />

  return (
    <ErrorBoundary>
      <Container>
        <GraphiQL fetcher={graphQLFetcher} />
      </Container>
    </ErrorBoundary>
  )
}

export default GraphIql
