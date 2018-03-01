// @flow
import React from 'react'
import { Voyager } from 'graphql-voyager'
import compose from 'recompose/compose'
import get from 'lodash/get'
import 'graphql-voyager/dist/voyager.css'

import dataGraphData from './dataGraphData'
import ErrorBoundary from '../shared/ErrorBoundary'

const enhance = compose(dataGraphData)

const DataGraph = ({ dataGraphData }: { dataGraphData: Object }) => {
  const loading = get(dataGraphData, 'loading', false)

  if (loading) return null
  return (
    <ErrorBoundary>
      <Voyager
        introspection={{ data: dataGraphData }}
        workerURI={`${process.env.PUBLIC_URL}/voyager.worker.js`}
        displayOptions={{ skipRelay: true }}
      />
    </ErrorBoundary>
  )
}

export default enhance(DataGraph)
