// @flow
import React from 'react'

import Item from './Item'

const PcoFilterItems = ({ pcoFilters }: { pcoFilters: Array<Object> }) =>
  pcoFilters.map(f => <Item key={`${f.pcname}: ${f.pname}`} filter={f} />)

export default PcoFilterItems
