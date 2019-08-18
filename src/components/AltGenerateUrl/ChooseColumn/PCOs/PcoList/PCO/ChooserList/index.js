import React from 'react'

import Chooser from './Chooser'

const PcoChooserList = ({ properties }) =>
  properties.map(p => (
    <Chooser
      key={`${p.propertyName}${p.jsontype}`}
      pcname={p.propertyCollectionName}
      pname={p.propertyName}
      jsontype={p.jsontype}
      count={p.count}
    />
  ))

export default PcoChooserList
