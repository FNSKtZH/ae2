// @flow
import React from 'react'

import Item from './Item'

const ExportTaxFilterListItems = ({
  exportTaxFilters,
}: {
  exportTaxFilters: Array<Object>,
}) =>
  exportTaxFilters.map(f => (
    <Item key={`${f.taxname}: ${f.pname}`} filter={f} />
  ))

export default ExportTaxFilterListItems
