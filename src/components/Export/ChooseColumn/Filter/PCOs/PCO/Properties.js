// @flow
import React from 'react'

import Property from './Property'

const Properties = ({ properties }: { properties: Array<Object> }) =>
  properties.map(field => (
    <Property
      key={`${field.propertyName}${field.jsontype}`}
      pcname={field.propertyCollectionName}
      pname={field.propertyName}
      jsontype={field.jsontype}
    />
  ))

export default Properties
