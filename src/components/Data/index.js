// @flow
import React from 'react'

import DataStacked from './DataStacked'
import DataFlexed from './DataFlexed'

const Data = ({ stacked }: { stacked: Boolean }) =>
  stacked ? <DataStacked /> : <DataFlexed />

export default Data
