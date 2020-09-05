import React from 'react'

import TaxChooser from './TaxChooser'

const TaxChooserList = ({ properties, columns }) => {
  const propertiesLength = properties.length

  return properties.map((p) => (
    <TaxChooser
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

export default TaxChooserList
