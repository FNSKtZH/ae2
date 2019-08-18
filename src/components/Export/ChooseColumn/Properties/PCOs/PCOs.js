import React from 'react'

import PCO from './PCO'

const PCOs = ({ pcNames }) => pcNames.map(name => <PCO key={name} pc={name} />)

export default PCOs
