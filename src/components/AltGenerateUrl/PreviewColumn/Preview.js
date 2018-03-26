// @flow
import React from 'react'
import ReactDataGrid from 'react-data-grid'
import Snackbar from 'material-ui/Snackbar'
import compose from 'recompose/compose'
import withState from 'recompose/withState'
import withHandlers from 'recompose/withHandlers'
import styled from 'styled-components'
import get from 'lodash/get'
import orderBy from 'lodash/orderBy'

import exportData from './exportData'
import exportIdsData from '../exportIdsData'
import exportTaxonomiesData from '../exportTaxonomiesData'
import exportPcoPropertiesData from '../exportPcoPropertiesData'
import exportRcoPropertiesData from '../exportRcoPropertiesData'
import exportTaxPropertiesData from '../exportTaxPropertiesData'
import exportTaxFiltersData from '../exportTaxFiltersData'
import exportPcoFiltersData from '../exportPcoFiltersData'
import exportRcoFiltersData from '../exportRcoFiltersData'
import exportWithSynonymDataData from '../exportWithSynonymDataData'
import exportRcoInOneRowData from '../exportRcoInOneRowData'
import exportOnlyRowsWithPropertiesData from '../exportOnlyRowsWithPropertiesData'
import ErrorBoundary from '../../shared/ErrorBoundary'
import rowsFromObjects from './rowsFromObjects'

const Container = styled.div`
  padding-top: 5px;
  .react-grid-Container {
    font-size: small;
  }
  .react-grid-Header {
  }
  .react-grid-HeaderRow {
    overflow: hidden;
  }
  .react-grid-HeaderCell:not(:first-child) {
    border-left: #c7c7c7 solid 1px !important;
  }
  .react-grid-HeaderCell__draggable {
    right: 16px !important;
  }
  .react-grid-Cell {
    border: #ddd solid 1px !important;
  }
`
const SpreadsheetContainer = styled.div`
  display: flex;
  flex-direction: column;
`
const TotalDiv = styled.div`
  font-size: small;
  padding-left: 9px;
  margin-top: 4px;
`
const StyledSnackbar = styled(Snackbar)`
  div {
    min-width: auto;
    background-color: #2e7d32 !important;
  }
`

const enhance = compose(
  exportIdsData,
  exportTaxonomiesData,
  exportTaxPropertiesData,
  exportTaxFiltersData,
  exportPcoPropertiesData,
  exportPcoFiltersData,
  exportRcoPropertiesData,
  exportRcoFiltersData,
  exportWithSynonymDataData,
  exportRcoInOneRowData,
  exportOnlyRowsWithPropertiesData,
  exportData,
  withState('sortField', 'setSortField', 'id'),
  withState('sortDirection', 'setSortDirection', 'asc'),
  withState('message', 'setMessage', ''),
  withHandlers({
    onSetMessage: ({ message, setMessage }) => (message: String) => {
      setMessage(message)
      if (!!message) {
        setTimeout(() => setMessage(''), 5000)
      }
    },
  })
)

const Preview = ({
  exportData,
  exportIdsData,
  exportTaxonomiesData,
  exportTaxPropertiesData,
  exportTaxFiltersData,
  exportPcoPropertiesData,
  exportPcoFiltersData,
  exportRcoPropertiesData,
  exportRcoFiltersData,
  exportWithSynonymDataData,
  exportRcoInOneRowData,
  exportOnlyRowsWithPropertiesData,
  sortField,
  sortDirection,
  setSortField,
  setSortDirection,
  message,
  onSetMessage,
}: {
  exportData: Object,
  exportIdsData: Object,
  exportTaxonomiesData: Object,
  exportTaxPropertiesData: Object,
  exportTaxFiltersData: Object,
  exportPcoPropertiesData: Object,
  exportPcoFiltersData: Object,
  exportRcoPropertiesData: Object,
  exportRcoFiltersData: Object,
  exportWithSynonymDataData: Object,
  exportRcoInOneRowData: Object,
  exportOnlyRowsWithPropertiesData: Object,
  sortField: String,
  sortDirection: String,
  setSortField: () => void,
  setSortDirection: () => void,
  message: String,
  onSetMessage: () => void,
}) => {
  const exportIds = get(exportIdsData, 'exportIds', [])
  const exportWithSynonymData = get(
    exportWithSynonymDataData,
    'exportWithSynonymData',
    true
  )
  const exportRcoInOneRow = get(
    exportRcoInOneRowData,
    'exportRcoInOneRow',
    true
  )
  const exportOnlyRowsWithProperties = get(
    exportOnlyRowsWithPropertiesData,
    'exportOnlyRowsWithProperties',
    true
  )
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
  const exportRcoPropertyNames = exportRcoProperties.map(p => p.pname)
  const { loading } = exportData
  const objects = get(exportData, 'exportObject.nodes', [])
  const pco = get(exportData, 'exportPco.nodes', [])
  const synonymPco = get(exportData, 'exportSynonymPco.nodes', [])
  const rco = get(exportData, 'exportRco.nodes', [])
  const synonymRco = get(exportData, 'exportSynonymRco.nodes', [])
  // need taxFields to filter only data with properties
  let { rows, pvColumns } = rowsFromObjects({
    objects,
    exportTaxProperties,
    exportWithSynonymData,
    exportRcoInOneRow,
    exportPcoProperties,
    pco,
    synonymPco,
    rco,
    synonymRco,
    exportRcoPropertyNames,
    exportRcoProperties,
    exportIds,
    exportOnlyRowsWithProperties,
  })
  rows = orderBy(rows, sortField, sortDirection)
  const anzFelder = rows[0] ? Object.keys(rows[0]).length : 0

  return (
    <ErrorBoundary>
      <Container>
        {rows.length > 0 && (
          <SpreadsheetContainer>
            <TotalDiv>{`Vorschau: ${rows.length.toLocaleString(
              'de-CH'
            )} Datensätze, ${anzFelder.toLocaleString('de-CH')} ${
              anzFelder === 1 ? 'Feld' : 'Felder'
            }`}</TotalDiv>
            <ReactDataGrid
              onGridSort={(column, direction) => {
                setSortField(column)
                setSortDirection(direction.toLowerCase())
              }}
              columns={pvColumns}
              rowGetter={i => rows[i]}
              rowsCount={rows.length}
              minHeight={500}
              minColumnWidth={120}
            />
          </SpreadsheetContainer>
        )}
        <StyledSnackbar open={!!message} message={message} />
        <StyledSnackbar open={loading} message="lade Daten..." />
      </Container>
    </ErrorBoundary>
  )
}

export default enhance(Preview)
