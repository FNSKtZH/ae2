// @flow
import React from 'react'
import compose from 'recompose/compose'
import styled from 'styled-components'
import get from 'lodash/get'
import ReactDataGrid from 'react-data-grid'

import activeNodeArrayData from '../../modules/activeNodeArrayData'
import pCOData from './pCOData'

const enhance = compose(activeNodeArrayData, pCOData)

const Container = styled.div`
  padding: 10px;
`

const PropertyCollection = ({ pCOData }: { pCOData: Object }) => {
  const pCO = get(
    pCOData,
    'propertyCollectionById.propertyCollectionObjectsByPropertyCollectionId.nodes',
    []
  )
  console.log('PCO: pCO:', pCO)
  const columns = pCO[0]
    ? Object.keys(pCO[0]).map(k => ({
        key: k,
        name: k,
        resizable: true,
        sortable: true,
      }))
    : []
  console.log('PCO: columns:', columns)
  // TODO: __typename comes in pCO!!!???
  // TODO: map pCO and extract object name
  // TODO: map pCO and extract all properties, meanwhile building columns

  return (
    <Container>
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
    </Container>
  )
}

export default enhance(PropertyCollection)
