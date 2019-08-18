// @flow
import React from 'react'

import Property from './Property'

const RcoCard = ({ properties }) =>
  properties.map(p => (
    <Property
      key={`${p.propertyName}|${p.relationType}|${p.jsontype}`}
      pcname={p.propertyCollectionName}
      relationtype={p.relationType}
      pname={p.propertyName}
      jsontype={p.jsontype}
    />
  ))

export default RcoCard
