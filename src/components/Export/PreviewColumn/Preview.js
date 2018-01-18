// @flow
import React from 'react'
import ReactDataGrid from 'react-data-grid'
import Button from 'material-ui-next/Button'
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
import exportTaxonomiesData from '../exportTaxonomiesData'
import exportPcoPropertiesData from '../exportPcoPropertiesData'
import exportRcoPropertiesData from '../exportRcoPropertiesData'
import exportTaxPropertiesData from '../exportTaxPropertiesData'
import exportTaxFiltersData from '../exportTaxFiltersData'
import exportPcoFiltersData from '../exportPcoFiltersData'
import exportRcoFiltersData from '../exportRcoFiltersData'
import exportWithSynonymDataData from '../exportWithSynonymDataData'
import exportOnlyRowsWithPropertiesData from '../exportOnlyRowsWithPropertiesData'
import conv from '../../../modules/convertExportFieldName'
import exportXlsx from '../../../modules/exportXlsx'
import exportCsv from '../../../modules/exportCsv'
import booleanToJaNein from '../../../modules/booleanToJaNein'

const Container = styled.div`
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
const snackbarBodyStyle = {
  maxWidth: 'auto',
  minWidth: 'auto',
  backgroundColor: '#2E7D32',
}

const enhance = compose(
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
  const taxFields = ['id']
  let rows = objects.map(o => {
    // 1. object
    const row = {}
    row.id = o.id
    const properties = o.properties ? JSON.parse(o.properties) : {}
    exportTaxProperties.forEach(p => {
      let val = null
      if (properties && properties[p.pname] !== undefined) {
        if (typeof properties[p.pname] === 'boolean') {
          val = booleanToJaNein(properties[p.pname])
        } else {
          val = properties[p.pname]
        }
      }
      taxFields.push(`${conv(p.taxname)}__${conv(p.pname)}`)
      return (row[`${conv(p.taxname)}__${conv(p.pname)}`] = val)
    })
    // 2. pco
    const thesePco = pco.filter(p => p.objectId === o.id)
    const theseSynonymPco = synonymPco.filter(p => p.objectId === o.id)
    const pcoToUse = [...thesePco]
    if (exportWithSynonymData) {
      theseSynonymPco.forEach(sPco => {
        // add if not yet contained
        const idContained = pcoToUse.find(pco => pco.id === sPco.id)
        if (!idContained) pcoToUse.push(sPco)
      })
    }
    pcoToUse.forEach(pco => {
      const pcoProperties = JSON.parse(pco.properties)
      //console.log('Preview: pcoProperties:', pcoProperties)
      exportPcoProperties.forEach(p => {
        if (pcoProperties && pcoProperties[p.pname] !== undefined) {
          let val = pcoProperties[p.pname]
          if (typeof val === 'boolean') {
            val = booleanToJaNein(val)
          }
          row[`${conv(p.pcname)}__${conv(p.pname)}`] = val
        }
      })
    })
    // add every field if still missing
    exportPcoProperties.forEach(p => {
      if (row[`${conv(p.pcname)}__${conv(p.pname)}`] === undefined) {
        row[`${conv(p.pcname)}__${conv(p.pname)}`] = null
      }
    })
    // 3. rco
    const theseRco = rco.filter(p => p.objectId === o.id)
    const theseSynonymRco = synonymRco.filter(p => p.objectId === o.id)
    const rcoToUse = [...theseRco]
    if (exportWithSynonymData) {
      theseSynonymRco.forEach(sRco => {
        // add if not yet contained
        const idContained = rcoToUse.find(rco => rco.id === sRco.id)
        if (!idContained) rcoToUse.push(sRco)
      })
    }
    rcoToUse.forEach(rco => {
      const bezPartnerId = get(rco, 'objectByObjectIdRelation.id', null)
      if (exportRcoPropertyNames.includes('Beziehungspartner_id')) {
        row[`Beziehungspartner_id`] = bezPartnerId
      }
      const bezPartnerTaxonomyName = get(
        rco,
        'objectByObjectIdRelation.taxonomyByTaxonomyId.name',
        ''
      )
      const bezPartnerName = get(rco, 'objectByObjectIdRelation.name', '')
      const bezPartner = `${bezPartnerTaxonomyName}: ${bezPartnerName}`
      if (exportRcoPropertyNames.includes('Beziehungspartner_Name')) {
        row[`Beziehungspartner_Name`] = bezPartner
      }
      const rcoProperties = JSON.parse(rco.properties)
      exportRcoProperties.forEach(p => {
        if (rcoProperties && rcoProperties[p.pname] !== undefined) {
          let val = rcoProperties[p.pname]
          if (typeof val === 'boolean') {
            val = booleanToJaNein(val)
          }
          row[`${conv(p.pcname)}__${conv(p.pname)}`] = val
        }
      })
    })
    // add every field if still missing
    exportRcoProperties.forEach(p => {
      if (row[`${conv(p.pcname)}__${conv(p.pname)}`] === undefined) {
        row[`${conv(p.pcname)}__${conv(p.pname)}`] = null
      }
    })
    return row
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
          <Button raised onClick={() => exportXlsx({ rows, onSetMessage })}>
            .xlsx herunterladen
          </Button>
          <Button raised onClick={() => exportCsv(rows)}>
            .csv herunterladen
          </Button>
        </ButtonsContainer>
      )}
      <Snackbar
        open={!!message}
        message={message}
        bodyStyle={snackbarBodyStyle}
      />
      <Snackbar
        open={loading}
        message="lade Daten..."
        bodyStyle={snackbarBodyStyle}
      />
    </Container>
  )
}

export default enhance(Preview)
