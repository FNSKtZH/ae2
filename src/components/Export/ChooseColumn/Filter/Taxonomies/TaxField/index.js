//@flow
import React, { useState, useCallback } from 'react'
import styled from 'styled-components'
import Measure from 'react-measure'
import { useQuery } from 'react-apollo-hooks'
import gql from 'graphql-tag'

import Comparator from './Comparator'
import Value from './Value'

const Container = styled.div`
  display: flex;
  align-content: stretch;
  padding: 4px 16px;
  > div {
    height: auto;
  }
`

const storeQuery = gql`
  query exportTaxFiltersQuery {
    exportTaxFilters @client {
      taxname
      pname
      comparator
      value
    }
  }
`

const TaxField = ({
  taxname,
  pname,
  jsontype,
}: {
  taxname: String,
  pname: String,
  jsontype: String,
}) => {
  const [width, setWidth] = useState(0)

  const { data: storeData } = useQuery(storeQuery, { suspend: false })

  const { exportTaxFilters } = storeData
  const exportTaxFilter = exportTaxFilters.find(
    x => x.taxname === taxname && x.pname === pname,
  ) || { comparator: null, value: null }
  const { comparator, value } = exportTaxFilter

  const onResize = useCallback(contentRect =>
    setWidth(contentRect.bounds.width),
  )

  return (
    <Measure bounds onResize={onResize}>
      {({ measureRef }) => (
        <Container ref={measureRef}>
          <Value
            key={`${taxname}/${pname}/${jsontype}`}
            taxname={taxname}
            pname={pname}
            value={value}
            jsontype={jsontype}
            comparator={comparator}
            width={width - 32}
          />
          {value !== undefined && value !== null && (
            <Comparator
              taxname={taxname}
              pname={pname}
              comparator={comparator}
              value={value}
            />
          )}
        </Container>
      )}
    </Measure>
  )
}

export default TaxField
