// @flow
import React from 'react'
import { Voyager } from 'graphql-voyager'
import { useQuery } from '@apollo/react-hooks'
import 'graphql-voyager/dist/voyager.css'

import query from './query'
import ErrorBoundary from '../shared/ErrorBoundary'

/**
 * need to copy worker file to public folder, see here:
 * https://github.com/APIs-guru/graphql-voyager#using-as-a-dependency
 */

const DataGraph = () => {
  const { data, error, loading } = useQuery(query)
  if (loading) return null
  if (error) return `Error loading data:${error.message}`

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

export default DataGraph
