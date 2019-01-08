// @flow
import React from 'react'

import PCO from './PCO'

const PCOs = ({ pcNames }: { pcNames: Array<string> }) =>
  pcNames.map(pc => <PCO key={pc} pc={pc} />)

export default PCOs
