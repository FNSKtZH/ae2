// @flow
import React from 'react'

import ExportStacked from './ExportStacked'
import ExportFlexed from './ExportFlexed'

const Export = ({ stacked }: { stacked: Boolean }) =>
  stacked ? <ExportStacked /> : <ExportFlexed />

export default Export
