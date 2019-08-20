import React from 'react'

import PCO from './PCO'

const PCOs = ({ pcNames }) => pcNames.map(pc => <PCO key={pc} pc={pc} />)

export default PCOs
