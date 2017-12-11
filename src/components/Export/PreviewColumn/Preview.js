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
  const exportPcoProperties = get(
    exportPcoPropertiesData,
    'exportPcoProperties',
    []
  )
  const exportRcoProperties = get(
    exportRcoPropertiesData,
    'exportRcoProperties',
    []
  )
  const objects = get(exportData, 'exportObject.nodes', [])
  const pco = get(exportData, 'exportPco.nodes', [])
  const synonymPco = get(exportData, 'exportSynonymPco.nodes', [])
  const rco = get(exportData, 'exportRco.nodes', [])
  const synonymRco = get(exportData, 'exportSynonymRco.nodes', [])
  const rows = objects.map(o => {
    // 1. object
    const row = {}
    row.id = o.id
    const properties = JSON.parse(o.properties)
    exportTaxProperties.forEach(
      p => (row[`${conv(p.taxname)}__${conv(p.pname)}`] = properties[p.pname])
    )
    // 2. pco
    const thisPco = pco.find(p => p.objectId === o.id)
    const thisSynonymPco = synonymPco.find(p => p.objectId === o.id)
    if (thisPco) {
      const thisPcoProperties = JSON.parse(thisPco.properties)
      exportPcoProperties.forEach(p => {
        row[`${conv(p.pcname)}__${conv(p.pname)}`] = thisPcoProperties[p.pname]
      })
    } else if (thisSynonymPco) {
      // only use of this pco does not exist on original object
      const thisSynonymPcoProperties = JSON.parse(thisSynonymPco.properties)
      exportPcoProperties.forEach(p => {
        row[`${conv(p.pcname)}__${conv(p.pname)}`] =
          thisSynonymPcoProperties[p.pname]
      })
    }
    // add every field if still missing
    exportPcoProperties.forEach(p => {
      if (row[`${conv(p.pcname)}__${conv(p.pname)}`] === undefined) {
        row[`${conv(p.pcname)}__${conv(p.pname)}`] = null
      }
    })
    // 3. rco
    const thisRco = rco.find(p => p.objectId === o.id)
    const thisSynonymRco = synonymRco.find(p => p.objectId === o.id)
    if (thisRco) {
      const thisRcoProperties = JSON.parse(thisRco.properties)
      exportRcoProperties.forEach(p => {
        row[`${conv(p.pcname)}__${conv(p.pname)}`] = thisRcoProperties[p.pname]
      })
    } else if (thisSynonymRco) {
      // only use of this rco does not exist on original object
      const thisSynonymRcoProperties = JSON.parse(thisSynonymRco.properties)
      exportRcoProperties.forEach(p => {
        row[`${conv(p.pcname)}__${conv(p.pname)}`] =
          thisSynonymRcoProperties[p.pname]
      })
    }
    // add every field if still missing
    exportRcoProperties.forEach(p => {
      if (row[`${conv(p.pcname)}__${conv(p.pname)}`] === undefined) {
        row[`${conv(p.pcname)}__${conv(p.pname)}`] = null
      }
    })
    return row
  })
  console.log('Preview: rows:', rows)
  const pvColumns = rows[0]
    ? Object.keys(rows[0]).map(k => ({ key: k, name: k }))
    : []

  return (
    <ReactDataGrid
      columns={pvColumns}
      rowGetter={i => rows[i]}
      rowsCount={rows.length}
      minHeight={500}
    />
  )
}

export default enhance(Preview)
