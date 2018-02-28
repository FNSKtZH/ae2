// @flow
import React from 'react'
import ReactDataGrid from 'react-data-grid'
import Button from 'material-ui/Button'
import Snackbar from 'material-ui/Snackbar'
import compose from 'recompose/compose'
import withState from 'recompose/withState'
import withHandlers from 'recompose/withHandlers'
import styled from 'styled-components'
import get from 'lodash/get'
import orderBy from 'lodash/orderBy'
import omit from 'lodash/omit'
import some from 'lodash/some'

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
import exportOnlyRowsWithPropertiesData from '../exportOnlyRowsWithPropertiesData'
import exportXlsx from '../../../modules/exportXlsx'
import exportCsv from '../../../modules/exportCsv'
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
const ButtonsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
`
const TotalDiv = styled.div`
  font-size: small;
  padding-left: 9px;
  margin-top: 4px;
`
const StyledButton = styled(Button)`
  border: 1px solid !important;
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
  const objectsCount = get(
    exportData,
    'exportObject.totalCount',
    0
  ).toLocaleString('de-CH')
  const pco = get(exportData, 'exportPco.nodes', [])
  const synonymPco = get(exportData, 'exportSynonymPco.nodes', [])
  const rco = get(exportData, 'exportRco.nodes', [])
  const synonymRco = get(exportData, 'exportSynonymRco.nodes', [])
  // need taxFields to filter only data with properties
  let { rows, taxFields } = rowsFromObjects({
    objects,
    exportTaxProperties,
    exportWithSynonymData,
    exportPcoProperties,
    pco,
    synonymPco,
    rco,
    synonymRco,
    exportRcoPropertyNames,
    exportRcoProperties,
    exportIds,
  })

  const fields = rows[0] ? Object.keys(rows[0]).map(k => k) : []
  const propertyFields = fields.filter(f => !taxFields.includes(f))
  if (exportOnlyRowsWithProperties && propertyFields.length > 0) {
    // filter rows that only contain values in taxFields
    rows = rows.filter(row => {
      // check if any property field contains a value
      const propertyRow = omit(row, taxFields)
      const valueExists = some(propertyRow, v => v !== undefined && v !== null)
      return valueExists
    })
  }
  rows = orderBy(rows, sortField, sortDirection)
  const pvColumns = fields.map(k => ({
    key: k,
    name: k,
    resizable: true,
    sortable: true,
  }))
  const anzFelder = rows[0] ? Object.keys(rows[0]).length : 0

  return (
    <ErrorBoundary>
      <Container>
        {rows.length > 0 && (
          <SpreadsheetContainer>
            <TotalDiv>{`${rows.length.toLocaleString(
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
        {rows.length === 0 && (
          <SpreadsheetContainer>
            <TotalDiv>{`${objectsCount} Datensätze`}</TotalDiv>
          </SpreadsheetContainer>
        )}
        {rows.length > 0 && (
          <ButtonsContainer>
            <StyledButton onClick={() => exportXlsx({ rows, onSetMessage })}>
              .xlsx herunterladen
            </StyledButton>
            <StyledButton onClick={() => exportCsv(rows)}>
              .csv herunterladen
            </StyledButton>
          </ButtonsContainer>
        )}
        <StyledSnackbar open={!!message} message={message} />
        <StyledSnackbar open={loading} message="lade Daten..." />
      </Container>
    </ErrorBoundary>
  )
}

export default enhance(Preview)
