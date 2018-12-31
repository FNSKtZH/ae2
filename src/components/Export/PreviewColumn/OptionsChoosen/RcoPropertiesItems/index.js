// @flow
import React from 'react'

import Item from './Item'

const ExportRcoPropertiesListItems = ({
  exportRcoProperties,
}: {
  exportRcoProperties: Array<Object>,
}) =>
  exportRcoProperties.map(p => (
    <Item key={`${p.pcname} - ${p.relationtype}: ${p.pname}`} properties={p} />
  ))

export default ExportRcoPropertiesListItems
