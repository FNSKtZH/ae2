import React from 'react'

import Property from './Property'

const RcoCard = ({ properties, columns }) => {
  const propertiesLength = properties.length

  return properties.map((p) => (
    <Property
      key={`${p.propertyName}|${p.relationType}|${p.jsontype}`}
      pcname={p.propertyCollectionName}
      relationtype={p.relationType}
      pname={p.propertyName}
      jsontype={p.jsontype}
      columns={columns}
      propertiesLength={propertiesLength}
    />
  ))
}

export default RcoCard
