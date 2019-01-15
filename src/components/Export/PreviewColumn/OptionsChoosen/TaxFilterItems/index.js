// @flow
import React from 'react'

import Item from './Item'

const ExportTaxFilterListItems = ({
  taxFilters,
}: {
  taxFilters: Array<Object>,
}) => taxFilters.map(f => <Item key={`${f.taxname}: ${f.pname}`} filter={f} />)

export default ExportTaxFilterListItems
