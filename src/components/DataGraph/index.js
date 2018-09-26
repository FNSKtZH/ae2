// @flow
import React from 'react'
import { Voyager } from 'graphql-voyager'
import compose from 'recompose/compose'
import 'graphql-voyager/dist/voyager.css'

import withDataGraphData from './withDataGraphData'
import ErrorBoundary from '../shared/ErrorBoundary'

const enhance = compose(withDataGraphData)

const DataGraph = ({ data }: { data: Object }) => {
  const {loading} = data
  if (loading) return null
  
  return (
    <ErrorBoundary>
      <Voyager
        introspection={{ data }}
        workerURI={`${process.env.PUBLIC_URL}/voyager.worker.js`}
        displayOptions={{ skipRelay: true }}
      />
    </ErrorBoundary>
  )
}

export default enhance(DataGraph)
