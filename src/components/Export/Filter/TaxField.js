//@flow
import React from 'react'
import styled from 'styled-components'
import compose from 'recompose/compose'

import Comparator from './TaxComparator'
import TaxFieldValue from './TaxFieldValue'
import exportTaxFiltersData from '../../../modules/exportTaxFiltersData'

const Container = styled.div`
  display: flex;
  align-content: stretch;
  padding: 0 16px;
`

const enhance = compose(exportTaxFiltersData)

const TaxField = ({
  taxName,
  pName,
  jsontype,
  count,
  exportTaxFiltersData,
}: {
  taxName: string,
  pName: string,
  jsontype: string,
  count: number,
  exportTaxFiltersData: Object,
}) => {
  const { exportTaxFilters } = exportTaxFiltersData
  //console.log('TaxField: exportTaxFilters:', exportTaxFilters)
  const exportTaxFilter = exportTaxFilters.find(
    x => x.taxName === taxName && x.pName === pName
  ) || { comparator: null, value: null }
  const { comparator, value } = exportTaxFilter

  return (
    <Container>
      <TaxFieldValue
        taxName={taxName}
        pName={pName}
        value={value}
        comparator={comparator}
      />
      <Comparator
        taxName={taxName}
        pName={pName}
        comparator={comparator}
        value={value}
      />
    </Container>
  )
}

export default enhance(TaxField)
