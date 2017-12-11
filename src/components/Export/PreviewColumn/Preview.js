// @flow
import React from 'react'
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table'
import compose from 'recompose/compose'
import styled from 'styled-components'
import get from 'lodash/get'

import exportData from '../../../modules/exportData'
import exportTaxonomiesData from '../../../modules/exportTaxonomiesData'
import exportPcoPropertiesData from '../../../modules/exportPcoPropertiesData'
import exportRcoPropertiesData from '../../../modules/exportRcoPropertiesData'
import exportTaxPropertiesData from '../../../modules/exportTaxPropertiesData'
import exportTaxFiltersData from '../../../modules/exportTaxFiltersData'
import exportPcoFiltersData from '../../../modules/exportPcoFiltersData'
import exportRcoFiltersData from '../../../modules/exportRcoFiltersData'

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
  const exportTaxonomies = get(exportTaxonomiesData, 'exportTaxonomies', [])
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
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHeaderColumn>ID</TableHeaderColumn>
          <TableHeaderColumn>Name</TableHeaderColumn>
          <TableHeaderColumn>Status</TableHeaderColumn>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableRowColumn>1</TableRowColumn>
          <TableRowColumn>John Smith</TableRowColumn>
          <TableRowColumn>Employed</TableRowColumn>
        </TableRow>
      </TableBody>
    </Table>
  )
}

export default enhance(Preview)
