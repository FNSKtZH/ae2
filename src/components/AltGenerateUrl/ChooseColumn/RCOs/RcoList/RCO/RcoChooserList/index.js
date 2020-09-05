import React from 'react'

import RcoChooser from './RcoChooser'

const RcoChooserList = ({ properties, columns }) => {
  const propertiesLength = properties.length

  return properties.map((p) => (
    <RcoChooser
      key={`${p.propertyName}${p.jsontype}`}
      pcname={p.propertyCollectionName}
      relationtype={p.relationType}
      pname={p.propertyName}
      jsontype={p.jsontype}
      count={p.count}
      columns={columns}
      propertiesLength={propertiesLength}
    />
  ))
}

export default RcoChooserList
