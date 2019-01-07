// @flow
import React from 'react'

import RCO from './RCO'

const RCOs = ({ pcNames }: { pcNames: Array<string> }) =>
  pcNames.map(pcName => <RCO key={pcName} pc={pcName} />)

export default RCOs
