import React from 'react'

import Item from './Item'

const ExportTaxFilterListItems = ({ taxFilters }) =>
  taxFilters.map(f => <Item key={`${f.taxname}: ${f.pname}`} filter={f} />)

export default ExportTaxFilterListItems
