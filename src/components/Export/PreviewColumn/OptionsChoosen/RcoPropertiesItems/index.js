import React from 'react'

import Item from './Item'

const ExportRcoPropertiesListItems = ({ rcoProperties }) =>
  rcoProperties.map(p => (
    <Item key={`${p.pcname}|${p.relationtype}|${p.pname}`} properties={p} />
  ))

export default ExportRcoPropertiesListItems
