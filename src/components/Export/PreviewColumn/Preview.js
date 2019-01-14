// @flow
import React, { useState, useCallback, useContext } from 'react'
import ReactDataGrid from 'react-data-grid'
import Button from '@material-ui/core/Button'
import Snackbar from '@material-ui/core/Snackbar'
import styled from 'styled-components'
import get from 'lodash/get'
import omit from 'lodash/omit'
import orderBy from 'lodash/orderBy'
import { useQuery } from 'react-apollo-hooks'
import gql from 'graphql-tag'
import { observer } from 'mobx-react-lite'

import exportXlsx from '../../../modules/exportXlsx'
import exportCsv from '../../../modules/exportCsv'
import ErrorBoundary from '../../shared/ErrorBoundary'
import rowsFromObjects from './rowsFromObjects'
import mobxStoreContext from '../../../mobxStoreContext'

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
  query Query(
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
const storeQuery = gql`
  query storeQuery {
    exportTaxProperties @client {
      taxname
      pname
    }
    exportTaxFilters @client {
      taxname
      pname
      comparator
      value
    }
    exportPcoProperties @client {
      pcname
      pname
    }
    exportPcoFilters @client {
      pcname
      pname
      comparator
      value
    }
    exportRcoProperties @client {
      pcname
      relationtype
      pname
    }
    exportPcoFilters @client {
      pcname
      pname
      comparator
      value
    }
    exportWithSynonymData @client
    exportRcoInOneRow @client
  }
`

const Preview = () => {
  const mobxStore = useContext(mobxStoreContext)
  const {
    onlyRowsWithProperties: exportOnlyRowsWithProperties,
  } = mobxStore.export
  const exportTaxonomies = mobxStore.export.taxonomies.toJSON()
  const exportIds = mobxStore.export.ids.toJSON()

  const { data: storeData } = useQuery(storeQuery, { suspend: false })
  const { loading: propsByTaxLoading, error: propsByTaxError } = useQuery(
    propsByTaxQuery,
    {
      suspend: false,
      variables: {
        exportTaxonomies,
        queryExportTaxonomies: exportTaxonomies.length > 0,
      },
    },
  )
  // need to remove __typename because apollo passes it along ?!
  const taxFilters = get(storeData, 'exportTaxFilters', []).map(d =>
    omit(d, ['__typename']),
  )
  const {
    data: exportObjectData,
    loading: exportObjectLoading,
    error: exportObjectError,
  } = useQuery(exportObjectQuery, {
    suspend: false,
    variables: {
      exportTaxonomies,
      taxFilters,
      fetchTaxProperties: get(storeData, 'exportTaxProperties', []).length > 0,
    },
  })
  const {
    data: synonymData,
    loading: synonymLoading,
    error: synonymError,
  } = useQuery(synonymQuery, { suspend: false })
  const pcoFilters = get(storeData, 'exportPcoFilters', []).map(d =>
    omit(d, ['__typename']),
  )
  const pcoProperties = get(storeData, 'exportPcoProperties', []).map(d =>
    omit(d, ['__typename']),
  )
  const {
    data: exportPcoData,
    loading: exportPcoLoading,
    error: exportPcoError,
  } = useQuery(exportPcoQuery, {
    suspend: false,
    variables: {
      pcoFilters,
      pcoProperties,
      fetchPcoProperties: pcoProperties.length > 0,
    },
  })
  const rcoFilters = get(storeData, 'exportRcoFilters', []).map(d =>
    omit(d, ['__typename']),
  )
  const rcoProperties = get(storeData, 'exportRcoProperties', []).map(d =>
    omit(d, ['__typename']),
  )
  const {
    data: exportRcoData,
    loading: exportRcoLoading,
    error: exportRcoError,
  } = useQuery(exportRcoQuery, {
    suspend: false,
    variables: {
      rcoFilters,
      rcoProperties,
      fetchRcoProperties: rcoProperties.length > 0,
    },
  })

  const [sortField, setSortField] = useState('id')
  const [sortDirection, setSortDirection] = useState('asc')
  const [message, setMessage] = useState('')

  const onSetMessage = useCallback(
    message => {
      setMessage(message)
      if (!!message) {
        setTimeout(() => setMessage(''), 5000)
      }
    },
    [message],
  )

  const exportWithSynonymData = get(storeData, 'exportWithSynonymData', true)
  const exportRcoInOneRow = get(storeData, 'exportRcoInOneRow', true)
  const exportTaxProperties = get(storeData, 'exportTaxProperties', [])
  const exportPcoProperties = get(storeData, 'exportPcoProperties', [])
  const exportRcoProperties = get(storeData, 'exportRcoProperties', [])
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
  const loading =
    exportRcoLoading ||
    propsByTaxLoading ||
    exportObjectLoading ||
    exportPcoLoading ||
    synonymLoading

  const onGridSort = useCallback((column, direction) => {
    setSortField(column)
    setSortDirection(direction.toLowerCase())
  })
  const onClickXlsx = useCallback(() => exportXlsx({ rows, onSetMessage }), [
    rows,
    message,
  ])
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
              rowGetter={i => rows[i]}
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
            <StyledButton onClick={onClickXlsx}>
              .xlsx herunterladen
            </StyledButton>
            <StyledButton onClick={onClickCsv}>.csv herunterladen</StyledButton>
          </ButtonsContainer>
        )}
        <StyledSnackbar open={!!message} message={message} />
        <StyledSnackbar open={loading} message="Lade Daten..." />
      </Container>
    </ErrorBoundary>
  )
}

export default observer(Preview)
