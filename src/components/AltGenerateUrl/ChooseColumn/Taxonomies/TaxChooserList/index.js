import React from 'react'

import TaxChooser from './TaxChooser'

const TaxChooserList = ({ properties }) =>
  properties.map(p => (
    <TaxChooser
      key={`${p.propertyName}${p.jsontype}`}
      taxname={'Taxonomie'}
      pname={p.propertyName}
      jsontype={p.jsontype}
      count={p.count}
    />
  ))

export default TaxChooserList
