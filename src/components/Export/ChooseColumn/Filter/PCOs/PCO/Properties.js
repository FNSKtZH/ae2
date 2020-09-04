import React from 'react'

import Property from './Property'

const Properties = ({ properties, columns }) => {
  const propertiesLength = properties.length

  return properties.map((field) => (
    <Property
      key={`${field.propertyName}${field.jsontype}`}
      pcname={field.propertyCollectionName}
      pname={field.propertyName}
      jsontype={field.jsontype}
      columns={columns}
      propertiesLength={propertiesLength}
    />
  ))
}

export default Properties
