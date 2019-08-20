import React from 'react'

import RCO from './RCO'

const RcoList = ({ rcNames }) => rcNames.map(rc => <RCO key={rc} pc={rc} />)

export default RcoList
