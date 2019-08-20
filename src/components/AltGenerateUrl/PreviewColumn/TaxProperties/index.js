import React from 'react'

import Property from './Property'

const TaxProperties = ({ properties }) =>
  properties.map(({ taxname, pname }, i) => (
    <Property key={`${taxname}: ${pname}`} taxname={taxname} pname={pname} />
  ))

export default TaxProperties
