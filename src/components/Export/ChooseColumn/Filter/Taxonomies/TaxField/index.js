//@flow
import React, { useState, useCallback } from 'react'
import styled from 'styled-components'
import compose from 'recompose/compose'
import Measure from 'react-measure'

import Comparator from './Comparator'
import Value from './Value'
import withExportTaxFiltersData from '../../../../withExportTaxFiltersData'

const Container = styled.div`
  display: flex;
  align-content: stretch;
  padding: 4px 16px;
  > div {
    height: auto;
  }
`

const enhance = compose(withExportTaxFiltersData)

const TaxField = ({
  taxname,
  pname,
  jsontype,
  exportTaxFiltersData,
}: {
  taxname: String,
  pname: String,
  jsontype: String,
  exportTaxFiltersData: Object,
}) => {
  const [width, setWidth] = useState(0)

  const { exportTaxFilters } = exportTaxFiltersData
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

export default enhance(TaxField)
