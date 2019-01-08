// @flow
import React from 'react'

import Property from './Property'

const OptionsChoosen = ({ properties }: { properties: Array<Object> }) =>
  properties.map(({ pcname, pname }, i) => (
    <Property key={`${pcname}|${pname}`} pcname={pcname} pname={pname} />
  ))

export default OptionsChoosen
