import React from 'react'

import DataStacked from './DataStacked'
import DataFlexed from './DataFlexed'

const Data = ({ stacked }) => (stacked ? <DataStacked /> : <DataFlexed />)

export default Data
