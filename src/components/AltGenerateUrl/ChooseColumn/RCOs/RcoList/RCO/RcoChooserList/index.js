// @flow
import React from 'react'

import RcoChooser from './RcoChooser'

const RcoChooserList = ({ properties }: { properties: Array<Object> }) =>
  properties.map(p => (
    <RcoChooser
      key={`${p.propertyName}${p.jsontype}`}
      pcname={p.propertyCollectionName}
      relationtype={p.relationType}
      pname={p.propertyName}
      jsontype={p.jsontype}
      count={p.count}
    />
  ))

export default RcoChooserList
