import React from 'react'

import Chooser from './Chooser'

const RcoProperties = ({ properties }) =>
  properties.map(p => (
    <Chooser
      key={`${p.propertyName}${p.jsontype}`}
      pcname={p.propertyCollectionName}
      relationtype={p.relationType}
      pname={p.propertyName}
      jsontype={p.jsontype}
      count={p.count}
    />
  ))

export default RcoProperties
