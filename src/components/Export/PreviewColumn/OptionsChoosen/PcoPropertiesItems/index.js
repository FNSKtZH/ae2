// @flow
import React from 'react'

import Item from './Item'

const ExportPcoPropertiesListItems = ({
  pcoProperties,
}: {
  pcoProperties: Array<Object>,
}) =>
  pcoProperties.map(p => (
    <Item key={`${p.pcname}: ${p.pname}`} properties={p} />
  ))

export default ExportPcoPropertiesListItems
