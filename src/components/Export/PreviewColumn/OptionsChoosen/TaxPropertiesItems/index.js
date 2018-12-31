// @flow
import React from 'react'

import Item from './Item'

const ExportTaxPropertiesListItems = ({
  exportTaxProperties,
}: {
  exportTaxProperties: Array<Object>,
}) => {
  return exportTaxProperties.map(p => (
    <Item key={`${p.taxname}: ${p.pname}`} properties={p} />
  ))
}

export default ExportTaxPropertiesListItems
