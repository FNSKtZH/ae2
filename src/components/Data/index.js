// @flow
import React from 'react'

import DataStacked from './DataStacked'
import DataFlexed from './DataFlexed'
import ErrorBoundary from '../shared/ErrorBoundary'

const Data = ({ stacked }: { stacked: Boolean }) => (
  <ErrorBoundary>{stacked ? <DataStacked /> : <DataFlexed />}</ErrorBoundary>
)

export default Data
