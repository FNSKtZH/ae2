import React from 'react'

import Chooser from './Taxonomy/Chooser'

const TaxProperties = ({ properties, columns }) => {
  const propertiesLength = properties.length

  return properties.map((p) => (
    <Chooser
      key={`${p.propertyName}${p.jsontype}`}
      taxname={'Taxonomie'}
      pname={p.propertyName}
      jsontype={p.jsontype}
      count={p.count}
      columns={columns}
      propertiesLength={propertiesLength}
    />
  ))
}

export default TaxProperties
