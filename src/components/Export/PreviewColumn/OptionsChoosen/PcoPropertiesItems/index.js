// @flow
import React from 'react'

import Item from './Item'

const ExportPcoPropertiesListItems = ({
  exportPcoProperties,
}: {
  exportPcoProperties: Array<Object>,
}) =>
  exportPcoProperties.map(p => (
    <Item key={`${p.pcname}: ${p.pname}`} properties={p} />
  ))

export default ExportPcoPropertiesListItems
