import React from 'react'

import Chooser from './Chooser'

const RcoProperties = ({ properties, columns }) => {
  const propertiesLength = properties.length

  return properties.map((p) => (
    <Chooser
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

export default RcoProperties
