import React from 'react'

import RCO from './RCO'

const RCOs = ({ rcNames }) =>
  rcNames.map(pcName => <RCO key={pcName} pc={pcName} />)

export default RCOs
