import React from 'react'

import Chooser from './Chooser'

const PCO = ({ properties, columns }) => {
  const propertiesLength = properties.length

  return properties.map((p) => (
    <Chooser
      key={`${p.propertyName}${p.jsontype}`}
      pcname={p.propertyCollectionName}
      pname={p.propertyName}
      jsontype={p.jsontype}
      count={p.count}
      columns={columns}
      propertiesLength={propertiesLength}
    />
  ))
}

export default PCO
