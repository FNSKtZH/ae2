// @flow
import React from 'react'
import GraphiQL from 'graphiql'
import get from 'lodash/get'
import 'graphiql/graphiql.css'
import styled from 'styled-components'

import ErrorBoundary from '../shared/ErrorBoundary'
import graphQlUri from '../../modules/graphQlUri'

const Container = styled.div`
  padding: 10px;
`

function graphQLFetcher(graphQLParams) {
  return fetch(graphQlUri(), {
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(graphQLParams),
  }).then(response => response.json())
}

const DataGraph = ({ dataGraphData }: { dataGraphData: Object }) => {
  const loading = get(dataGraphData, 'loading', false)
  if (loading) return <Container>Lade Daten...</Container>
  return (
    <ErrorBoundary>
      <GraphiQL fetcher={graphQLFetcher} />
    </ErrorBoundary>
  )
}

export default DataGraph
