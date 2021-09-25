import React, { useState, useCallback, useContext } from 'react'
import ReactDataGrid from 'react-data-grid'
import Button from '@mui/material/Button'
import Snackbar from '@mui/material/Snackbar'
import styled from 'styled-components'
import orderBy from 'lodash/orderBy'
import { useQuery, gql } from '@apollo/client'
import { observer } from 'mobx-react-lite'
import { getSnapshot } from 'mobx-state-tree'

import exportXlsx from '../../../modules/exportXlsx'
import exportCsv from '../../../modules/exportCsv'
import rowsFromObjects from './rowsFromObjects'
import mobxStoreContext from '../../../mobxStoreContext'
import ErrorBoundary from '../../shared/ErrorBoundary'

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
const ErrorContainer = styled.div`
  padding: 9px;
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

const propsByTaxQuery = gql`
  query propsByTaxDataQuery(
    $queryExportTaxonomies: Boolean!
    $exportTaxonomies: [String]
  ) {
    pcoPropertiesByTaxonomiesFunction(taxonomyNames: $exportTaxonomies)
      @include(if: $queryExportTaxonomies) {
      nodes {
        propertyCollectionName
        propertyName
        jsontype
        count
      }
    }
    rcoPropertiesByTaxonomiesFunction(taxonomyNames: $exportTaxonomies)
      @include(if: $queryExportTaxonomies) {
      nodes {
        propertyCollectionName
        relationType
        propertyName
        jsontype
        count
      }
    }
    taxPropertiesByTaxonomiesFunction(taxonomyNames: $exportTaxonomies)
      @include(if: $queryExportTaxonomies) {
      nodes {
        taxonomyName
        propertyName
        jsontype
        count
      }
    }
  }
`
const exportObjectQuery = gql`
  query PreviewColumnExportObjectQuery(
    $exportTaxonomies: [String]!
    $taxFilters: [TaxFilterInput]!
    $fetchTaxProperties: Boolean!
  ) {
    exportObject(exportTaxonomies: $exportTaxonomies, taxFilters: $taxFilters) {
      totalCount
      nodes {
        id
        properties @include(if: $fetchTaxProperties)
      }
    }
  }
`
const exportPcoQuery = gql`
  query exportDataQuery(
    $pcoFilters: [PcoFilterInput]!
    $pcoProperties: [PcoPropertyInput]!
    $fetchPcoProperties: Boolean!
  ) {
    exportPco(pcoFilters: $pcoFilters, pcoProperties: $pcoProperties)
      @include(if: $fetchPcoProperties) {
      totalCount
      nodes {
        id
        objectId
        propertyCollectionId
        propertyCollectionOfOrigin
        properties
      }
    }
  }
`
const exportRcoQuery = gql`
  query exportDataQuery(
    $rcoFilters: [RcoFilterInput]!
    $rcoProperties: [RcoPropertyInput]!
    $fetchRcoProperties: Boolean!
  ) {
    exportRco(rcoFilters: $rcoFilters, rcoProperties: $rcoProperties)
      @include(if: $fetchRcoProperties) {
      totalCount
      nodes {
        id
        propertyCollectionId
        objectId
        objectIdRelation
        objectByObjectIdRelation {
          id
          name
          taxonomyByTaxonomyId {
            id
            name
          }
        }
        propertyCollectionByPropertyCollectionId {
          id
          name
        }
        propertyCollectionOfOrigin
        relationType
        properties
      }
    }
  }
`
const synonymQuery = gql`
  query Query {
    allSynonyms {
      nodes {
        objectId
        objectIdSynonym
      }
    }
  }
`

const Preview = () => {
  const mobxStore = useContext(mobxStoreContext)
  const {
    onlyRowsWithProperties: exportOnlyRowsWithProperties,
    withSynonymData,
    pcoFilters: pcoFiltersPassed,
    rcoFilters: rcoFiltersPassed,
    taxFilters: taxFiltersPassed,
    rcoProperties: rcoPropertiesPassed,
    pcoProperties: pcoPropertiesPassed,
    taxProperties: taxPropertiesPassed,
    rcoInOneRow,
  } = mobxStore.export
  // 2019 08 20: No idea why suddenly need to getSnapshot
  // because without changes are not detected????
  const pcoFilters = getSnapshot(pcoFiltersPassed)
  const rcoFilters = getSnapshot(rcoFiltersPassed)
  const taxFilters = getSnapshot(taxFiltersPassed)
  const rcoProperties = getSnapshot(rcoPropertiesPassed)
  const pcoProperties = getSnapshot(pcoPropertiesPassed)
  const taxProperties = getSnapshot(taxPropertiesPassed)
  const exportTaxonomies = mobxStore.export.taxonomies.toJSON()
  const exportIds = mobxStore.export.ids.toJSON()

  const { loading: propsByTaxLoading, error: propsByTaxError } = useQuery(
    propsByTaxQuery,
    {
      variables: {
        exportTaxonomies,
        queryExportTaxonomies: exportTaxonomies.length > 0,
      },
    },
  )
  const {
    data: exportObjectData,
    loading: exportObjectLoading,
    error: exportObjectError,
  } = useQuery(exportObjectQuery, {
    variables: {
      exportTaxonomies,
      taxFilters,
      fetchTaxProperties: taxProperties.length > 0,
    },
  })
  const {
    data: synonymData,
    loading: synonymLoading,
    error: synonymError,
  } = useQuery(synonymQuery)
  const {
    data: exportPcoData,
    loading: exportPcoLoading,
    error: exportPcoError,
  } = useQuery(exportPcoQuery, {
    variables: {
      pcoFilters,
      pcoProperties,
      fetchPcoProperties: pcoProperties.length > 0,
    },
  })
  const {
    data: exportRcoData,
    loading: exportRcoLoading,
    error: exportRcoError,
  } = useQuery(exportRcoQuery, {
    variables: {
      rcoFilters,
      rcoProperties,
      fetchRcoProperties: rcoProperties.length > 0,
    },
  })

  const [sortField, setSortField] = useState('id')
  const [sortDirection, setSortDirection] = useState('asc')
  const [message, setMessage] = useState('')

  const onSetMessage = useCallback((message) => {
    setMessage(message)
    if (!!message) {
      setTimeout(() => setMessage(''), 5000)
    }
  }, [])

  const exportRcoPropertyNames = rcoProperties.map((p) => p.pname)
  const objects = exportObjectData?.exportObject?.nodes ?? []
  const pco = exportPcoData?.exportPco?.nodes ?? []
  const rco = exportRcoData?.exportRco?.nodes ?? []
  const synonyms = synonymData?.allSynonyms?.nodes ?? []

  // need taxFields to filter only data with properties
  const rowsResult = rowsFromObjects({
    objects,
    taxProperties,
    withSynonymData,
    rcoInOneRow,
    pcoProperties,
    pco,
    rco,
    synonyms,
    exportRcoPropertyNames,
    rcoProperties,
    exportIds,
    exportOnlyRowsWithProperties,
  })
  const rowsUnsorted = rowsResult?.rowsUnsorted ?? []
  const pvColumns = rowsResult?.pvColumns ?? []

  const rows = orderBy(rowsUnsorted, sortField, sortDirection)
  const anzFelder = rows[0] ? Object.keys(rows[0]).length : 0
  const loading =
    exportRcoLoading ||
    propsByTaxLoading ||
    exportObjectLoading ||
    exportPcoLoading ||
    synonymLoading

  const onGridSort = useCallback((column, direction) => {
    setSortField(column)
    setSortDirection(direction.toLowerCase())
  }, [])
  const onClickXlsx = useCallback(
    () => exportXlsx({ rows, onSetMessage }),
    [rows, onSetMessage],
  )
  const onClickCsv = useCallback(() => exportCsv(rows), [rows])

  if (propsByTaxError) {
    return (
      <ErrorContainer>
        `Error fetching data: ${propsByTaxError.message}`
      </ErrorContainer>
    )
  }
  if (exportObjectError) {
    return (
      <ErrorContainer>
        `Error fetching data: ${exportObjectError.message}`
      </ErrorContainer>
    )
  }
  if (synonymError) {
    return (
      <ErrorContainer>
        `Error fetching data: ${synonymError.message}`
      </ErrorContainer>
    )
  }
  if (exportPcoError) {
    return (
      <ErrorContainer>
        `Error fetching data: ${exportPcoError.message}`
      </ErrorContainer>
    )
  }
  if (exportRcoError) {
    return (
      <ErrorContainer>
        `Error fetching data: ${exportRcoError.message}`
      </ErrorContainer>
    )
  }

  return (
    <ErrorBoundary>
      <Container>
        {rows.length > 0 && (
          <SpreadsheetContainer>
            <TotalDiv>{`${rows.length.toLocaleString(
              'de-CH',
            )} Datensätze, ${anzFelder.toLocaleString('de-CH')} ${
              anzFelder === 1 ? 'Feld' : 'Felder'
            }`}</TotalDiv>
            <ReactDataGrid
              onGridSort={onGridSort}
              columns={pvColumns}
              rowGetter={(i) => rows[i]}
              rowsCount={rows.length}
              minHeight={500}
              minColumnWidth={120}
            />
          </SpreadsheetContainer>
        )}
        {rows.length === 0 && (
          <SpreadsheetContainer>
            <TotalDiv>{`${rows.length.toLocaleString(
              'de-CH',
            )} Datensätze`}</TotalDiv>
          </SpreadsheetContainer>
        )}
        {rows.length > 0 && (
          <ButtonsContainer>
            <StyledButton onClick={onClickXlsx} color="inherit">
              .xlsx herunterladen
            </StyledButton>
            <StyledButton onClick={onClickCsv} color="inherit">
              .csv herunterladen
            </StyledButton>
          </ButtonsContainer>
        )}
        <StyledSnackbar open={!!message} message={message} />
        <StyledSnackbar open={loading} message="Lade Daten..." />
      </Container>
    </ErrorBoundary>
  )
}

export default observer(Preview)
