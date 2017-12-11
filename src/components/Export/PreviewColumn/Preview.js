// @flow
import React from 'react'
import ReactDataGrid from 'react-data-grid'
import compose from 'recompose/compose'
//import styled from 'styled-components'
import get from 'lodash/get'

import exportData from '../../../modules/exportData'
import exportTaxonomiesData from '../../../modules/exportTaxonomiesData'
import exportPcoPropertiesData from '../../../modules/exportPcoPropertiesData'
import exportRcoPropertiesData from '../../../modules/exportRcoPropertiesData'
import exportTaxPropertiesData from '../../../modules/exportTaxPropertiesData'
import exportTaxFiltersData from '../../../modules/exportTaxFiltersData'
import exportPcoFiltersData from '../../../modules/exportPcoFiltersData'
import exportRcoFiltersData from '../../../modules/exportRcoFiltersData'
import conv from '../../../modules/convertExportFieldName'

const enhance = compose(
  exportTaxonomiesData,
  exportTaxPropertiesData,
  exportTaxFiltersData,
  exportPcoPropertiesData,
  exportPcoFiltersData,
  exportRcoPropertiesData,
  exportRcoFiltersData,
  exportData
)

const Preview = ({
  exportData,
  exportTaxonomiesData,
  exportTaxPropertiesData,
  exportTaxFiltersData,
  exportPcoPropertiesData,
  exportPcoFiltersData,
  exportRcoPropertiesData,
  exportRcoFiltersData,
}: {
  exportData: Object,
  exportTaxonomiesData: Object,
  exportTaxPropertiesData: Object,
  exportTaxFiltersData: Object,
  exportPcoPropertiesData: Object,
  exportPcoFiltersData: Object,
  exportRcoPropertiesData: Object,
  exportRcoFiltersData: Object,
}) => {
  const exportTaxProperties = get(
    exportTaxPropertiesData,
    'exportTaxProperties',
    []
  )
  const exportTaxFilters = get(exportTaxFiltersData, 'exportTaxFilters', [])
  const exportPcoProperties = get(
    exportPcoPropertiesData,
    'exportPcoProperties',
    []
  )
  const exportPcoFilters = get(exportPcoFiltersData, 'exportPcoFilters', [])
  const exportRcoProperties = get(
    exportRcoPropertiesData,
    'exportRcoProperties',
    []
  )
  const exportRcoFilters = get(exportRcoFiltersData, 'exportRcoFilters', [])
  console.log('Preview: exportData:', exportData)
  const objects = get(exportData, 'exportObject.nodes', [])
  console.log('Preview: objects:', objects)
  console.log('Preview: exportTaxProperties:', exportTaxProperties)
  console.log('Preview: exportPcoProperties:', exportPcoProperties)
  const rows = objects.map(o => {
    const row = {}
    row.id = o.id
    const properties = JSON.parse(o.properties)
    exportTaxProperties.forEach(
      p => (row[`${conv(p.taxname)}__${conv(p.pname)}`] = properties[p.pname])
    )
    /*exportPcoProperties.forEach(
      p => (row[`${conv(p.pcname)}__${conv(p.pname)}`] = properties[p.pname])
    )*/
    return row
  })
  console.log('Preview: rows:', rows)

  return <div>to do</div>
}

export default enhance(Preview)
