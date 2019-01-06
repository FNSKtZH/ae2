// @flow
import React from 'react'

import TaxField from '../TaxField'

const TaxProperties = ({ properties }: { properties: Array<Object> }) =>
  properties.map(p => (
    <TaxField
      key={`${p.propertyName}${p.jsontype}`}
      taxname={p.taxonomyName}
      pname={p.propertyName}
      jsontype={p.jsontype}
    />
  ))

export default TaxProperties
