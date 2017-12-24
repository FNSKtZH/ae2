// @flow
import React from 'react'
import compose from 'recompose/compose'
import styled from 'styled-components'
import get from 'lodash/get'
import omit from 'lodash/omit'
import forOwn from 'lodash/forOwn'
import ReactDataGrid from 'react-data-grid'

import activeNodeArrayData from '../../modules/activeNodeArrayData'
import pCOData from './pCOData'

const enhance = compose(activeNodeArrayData, pCOData)

const Container = styled.div`
  padding: 10px;
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

const PropertyCollection = ({ pCOData }: { pCOData: Object }) => {
  const pCO = []
  const pCORaw = get(
    pCOData,
    'propertyCollectionById.propertyCollectionObjectsByPropertyCollectionId.nodes',
    []
  ).map(p => omit(p, ['__typename']))
  pCORaw.forEach(p => {
    let nP = {
      objectId: p.objectId,
      objectName: get(p, 'objectByObjectId.name', null),
    }
    if (p.properties) {
      const props = JSON.parse(p.properties)
      forOwn(props, (value, key) => {
        if (typeof value === 'boolean') {
          nP[key] = value.toString()
        } else {
          nP[key] = value
        }
      })
    }
    pCO.push(nP)
  })
  //console.log('PCO: pCORaw:', pCORaw)
  //console.log('PCO: pCO:', pCO)
  const columns = pCO[0]
    ? Object.keys(pCO[0]).map(k => ({
        key: k,
        name: k,
        resizable: true,
        sortable: true,
      }))
    : []
  //console.log('PCO: columns:', columns)
  // TODO: map pCO and extract all properties, meanwhile building columns

  return (
    <Container>
      <SpreadsheetContainer>
        {pCO.length > 0 && (
          <ReactDataGrid
            onGridSort={(column, direction) => {
              //setSortField(column)
              //setSortDirection(direction.toLowerCase())
            }}
            columns={columns}
            rowGetter={i => pCO[i]}
            rowsCount={pCO.length}
            minHeight={500}
            minColumnWidth={120}
          />
        )}
        <TotalDiv>{`${pCO.length} Datensätze, ${columns.length -
          2} Felder`}</TotalDiv>
      </SpreadsheetContainer>
    </Container>
  )
}

export default enhance(PropertyCollection)
