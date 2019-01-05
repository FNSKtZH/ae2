// @flow
import React from 'react'

import Property from './Property'

const RcoCard = ({ properties }: { properties: Array<Object> }) =>
  properties.map(field => (
    <Property
      key={`${field.propertyName}${field.jsontype}`}
      pcname={field.propertyCollectionName}
      relationtype={field.relationType}
      pname={field.propertyName}
      jsontype={field.jsontype}
    />
  ))

export default RcoCard
