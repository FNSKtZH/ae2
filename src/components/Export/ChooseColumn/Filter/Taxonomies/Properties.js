import React from 'react'

import TaxField from './TaxField'

const TaxProperties = ({ properties, columns }) =>
  properties.map((p) => (
    <TaxField
      key={`${p.propertyName}${p.jsontype}`}
      taxname={p.taxonomyName || p.taxname}
      pname={p.propertyName}
      jsontype={p.jsontype}
      columns={columns}
    />
  ))

export default TaxProperties
