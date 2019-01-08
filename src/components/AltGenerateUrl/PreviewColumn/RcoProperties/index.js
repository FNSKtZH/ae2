// @flow
import React from 'react'

import Property from './Property'

const RcoProperties = ({ properties }: { properties: Array<Object> }) =>
  properties.map(({ pcname, relationtype, pname }, i) => (
    <Property
      key={`${pcname}|${relationtype}|${pname}`}
      pcname={pcname}
      relationtype={relationtype}
      pname={pname}
    />
  ))

export default RcoProperties
