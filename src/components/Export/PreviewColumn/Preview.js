// @flow
import React from 'react'
import ReactDataGrid from 'react-data-grid'
import Button from '@material-ui/core/Button'
import Snackbar from '@material-ui/core/Snackbar'
import compose from 'recompose/compose'
import withState from 'recompose/withState'
import withHandlers from 'recompose/withHandlers'
import styled from 'styled-components'
import get from 'lodash/get'
import orderBy from 'lodash/orderBy'

import exportRcoData from './exportRcoData'
import exportObjectData from './exportObjectData'
import exportPcoData from './exportPcoData'
import synonymData from './synonymData'
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
import exportXlsx from '../../../modules/exportXlsx'
import exportCsv from '../../../modules/exportCsv'
import ErrorBoundary from '../../shared/ErrorBoundary'
import rowsFromObjects from './rowsFromObjects'
import propsByTaxData from '../ChooseColumn/propsByTaxData'

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
  padding: 0 8px;
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
  propsByTaxData,
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
  exportObjectData,
  exportPcoData,
  exportRcoData,
  synonymData,
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
  }),
)

const Preview = ({
  exportRcoData,
  exportObjectData,
  exportPcoData,
  synonymData,
  propsByTaxData,
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
  exportRcoData: Object,
  exportObjectData: Object,
  exportPcoData: Object,
  synonymData: Object,
  propsByTaxData: Object,
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
  const objects = get(exportObjectData, 'exportObject.nodes', [])
  const pco = get(exportPcoData, 'exportPco.nodes', [])
  const rco = get(exportRcoData, 'exportRco.nodes', [])
  const synonyms = get(synonymData, 'allSynonyms.nodes', [])

  // need taxFields to filter only data with properties
  let { rows, pvColumns } = rowsFromObjects({
    objects,
    exportTaxProperties,
    exportWithSynonymData,
    exportRcoInOneRow,
    exportPcoProperties,
    pco,
    rco,
    synonyms,
    exportRcoPropertyNames,
    exportRcoProperties,
    exportIds,
    exportOnlyRowsWithProperties,
  })
  rows = orderBy(rows, sortField, sortDirection)
  const anzFelder = rows[0] ? Object.keys(rows[0]).length : 0
  const loading = exportRcoData.loading ||
    propsByTaxData.loading ||
    exportObjectData.loading ||
    exportPcoData.loading ||
    synonymData.loading
  //console.log('Preview:',{rows,anzFelder})

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
            <TotalDiv>{`${rows.length.toLocaleString('de-CH')} Datensätze`}</TotalDiv>
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
        <StyledSnackbar
          open={loading}
          message="Lade Daten..."
        />
      </Container>
    </ErrorBoundary>
  )
}

export default enhance(Preview)
