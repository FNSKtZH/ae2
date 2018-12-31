// @flow
import React from 'react'

import Item from './Item'

const ExportRcoFilterListItems = ({
  exportRcoFilters,
}: {
  exportRcoFilters: Array<Object>,
}) =>
  exportRcoFilters.map(f => <Item key={`${f.pcname}: ${f.pname}`} filter={f} />)

export default ExportRcoFilterListItems
