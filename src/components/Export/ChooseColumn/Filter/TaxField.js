//@flow
import React from 'react'
import styled from 'styled-components'
import compose from 'recompose/compose'

import Comparator from './TaxComparator'
import TaxFieldValue from './TaxFieldValue'
import exportTaxFiltersData from '../../exportTaxFiltersData'

const Container = styled.div`
  display: flex;
  align-content: stretch;
  padding: 4px 16px;
  > div {
    height: auto;
  }
`

const enhance = compose(exportTaxFiltersData)

const TaxField = ({
  taxname,
  pname,
  jsontype,
  count,
  exportTaxFiltersData,
}: {
  taxname: string,
  pname: string,
  jsontype: string,
  count: number,
  exportTaxFiltersData: Object,
}) => {
  const { exportTaxFilters } = exportTaxFiltersData
  const exportTaxFilter = exportTaxFilters.find(
    x => x.taxname === taxname && x.pname === pname
  ) || { comparator: null, value: null }
  const { comparator, value } = exportTaxFilter

  return (
    <Container>
      <TaxFieldValue
        key={`${taxname}/${pname}/${jsontype}`}
        taxname={taxname}
        pname={pname}
        value={value}
        jsontype={jsontype}
        comparator={comparator}
      />
      {value !== undefined &&
        value !== null && (
          <Comparator
            taxname={taxname}
            pname={pname}
            comparator={comparator}
            value={value}
          />
        )}
    </Container>
  )
}

export default enhance(TaxField)
