// @flow
import React from 'react'

import Chooser from './Taxonomy/Chooser'

const TaxProperties = ({ properties }) =>
  properties.map(p => (
    <Chooser
      key={`${p.propertyName}${p.jsontype}`}
      taxname={'Taxonomie'}
      pname={p.propertyName}
      jsontype={p.jsontype}
      count={p.count}
    />
  ))

export default TaxProperties
