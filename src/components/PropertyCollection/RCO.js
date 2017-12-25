// @flow
import React from 'react'
import compose from 'recompose/compose'
import withState from 'recompose/withState'
import styled from 'styled-components'
import get from 'lodash/get'
import omit from 'lodash/omit'
import forOwn from 'lodash/forOwn'
import union from 'lodash/union'
import orderBy from 'lodash/orderBy'
import ReactDataGrid from 'react-data-grid'

import activeNodeArrayData from '../../modules/activeNodeArrayData'
import booleanToJaNein from '../../modules/booleanToJaNein'
import rCOData from './rCOData'

const Container = styled.div`
  padding-top: 10px;
  display: flex;
  flex-direction: column;
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
const GridContainer = styled.div`
  height: 100%;
`
const TotalDiv = styled.div`
  font-size: small;
  padding-left: 9px;
  margin-top: 4px;
`

const enhance = compose(
  activeNodeArrayData,
  withState('sortField', 'setSortField', 'Objekt Name'),
  withState('sortDirection', 'setSortDirection', 'asc'),
  rCOData
)

const RCO = ({
  rCOData,
  dimensions,
  sortField,
  sortDirection,
  setSortField,
  setSortDirection,
}: {
  rCOData: Object,
  dimensions: Object,
  sortField: String,
  sortDirection: String,
  setSortField: () => void,
  setSortDirection: () => void,
}) => {
  console.log('ROC: rCOData:', rCOData)
  const height = isNaN(dimensions.height) ? 0 : dimensions.height
  const width = isNaN(dimensions.width) ? 0 : dimensions.width
  let rCO = []
  // collect all keys
  const allKeys = []
  const rCORaw = get(
    rCOData,
    'propertyCollectionById.relationsByPropertyCollectionId.nodes',
    []
  ).map(p => omit(p, ['__typename']))
  rCORaw.forEach(p => {
    let nP = {}
    nP['Objekt ID'] = p.objectId
    nP['Objekt Name'] = get(p, 'objectByObjectId.name', null)
    nP['Beziehung ID'] = p.objectIdRelation
    nP['Beziehung Name'] = get(p, 'objectByObjectIdRelation.name', null)
    nP['Art der Beziehung'] = p.relationType
    if (p.properties) {
      const props = JSON.parse(p.properties)
      forOwn(props, (value, key) => {
        if (typeof value === 'boolean') {
          nP[key] = booleanToJaNein(value)
        } else {
          nP[key] = value
        }
        // collect all keys
        allKeys.push(key)
      })
    }
    rCO.push(nP)
  })
  rCO = orderBy(rCO, sortField, sortDirection)
  // collect all keys and sort property keys by name
  const keys = [
    'Objekt ID',
    'Objekt Name',
    'Beziehung ID',
    'Beziehung Name',
    'Art der Beziehung',
    ...union(allKeys).sort(),
  ]
  const columns = keys.map(k => ({
    key: k,
    name: k,
    resizable: true,
    sortable: true,
  }))

  return (
    <Container>
      <GridContainer>
        {rCO.length > 0 && (
          <TotalDiv>{`${rCO.length} Datensätze, ${columns.length - 5} Feld${
            columns.length === 6 ? '' : 'er'
          }:`}</TotalDiv>
        )}
        {rCO.length > 0 && (
          <ReactDataGrid
            onGridSort={(column, direction) => {
              setSortField(column)
              setSortDirection(direction.toLowerCase())
            }}
            columns={columns}
            rowGetter={i => rCO[i]}
            rowsCount={rCO.length}
            minHeight={height - 33}
            minWidth={width}
          />
        )}
      </GridContainer>
    </Container>
  )
}

export default enhance(RCO)
