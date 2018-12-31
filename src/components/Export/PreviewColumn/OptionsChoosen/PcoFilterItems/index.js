// @flow
import React from 'react'

import Item from './Item'

const ExportPcoFilterListItems = ({
  exportPcoFilters,
}: {
  exportPcoFilters: Array<Object>,
}) =>
  exportPcoFilters.map(f => <Item key={`${f.pcname}: ${f.pname}`} filter={f} />)

export default ExportPcoFilterListItems
