// @flow
import React from 'react'

import Field from './Field'

const Fields = ({ properties }: { properties: Array<Object> }) =>
  properties.map(field => (
    <Field
      key={`${field.propertyName}${field.jsontype}`}
      pcname={field.propertyCollectionName}
      pname={field.propertyName}
      jsontype={field.jsontype}
    />
  ))

export default Fields
