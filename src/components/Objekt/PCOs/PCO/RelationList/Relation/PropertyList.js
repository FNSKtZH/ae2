import React from 'react'
import sortBy from 'lodash/sortBy'

import PropertyReadOnly from '../../../../../shared/PropertyReadOnly'

const Relation = ({ properties }) =>
  sortBy(Object.entries(properties), e => e[0])
    .filter(([key, value]) => value || value === 0)
    .map(([key, value]) => (
      <PropertyReadOnly key={key} value={value} label={key} />
    ))

export default Relation
