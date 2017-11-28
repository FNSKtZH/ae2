//@flow
import React from 'react'
import styled from 'styled-components'
import compose from 'recompose/compose'
import { graphql } from 'react-apollo'

import Comparator from './Comparator'
import TaxFieldValue from './TaxFieldValue'
import exportTaxFilterGql from '../../../modules/exportTaxFilterGql'

const Container = styled.div`
  display: flex;
`

const exportTaxFilterData = graphql(exportTaxFilterGql, {
  name: 'exportTaxFilterData',
})

const enhance = compose(exportTaxFilterData)

const TaxField = ({
  taxName,
  pName,
  jsontype,
  count,
  exportTaxFilterData,
}: {
  taxName: string,
  pName: string,
  jsontype: string,
  count: number,
  exportTaxFilterData: Object,
}) => {
  const exportTaxFilter = exportTaxFilterData.exportTaxFilter || []
  const taxInFilter = exportTaxFilter.find(
    x => x.taxName === taxName && x.pName === pName
  ) || { comparator: null, value: null }
  const { comparator, value } = taxInFilter

  return (
    <Container>
      <Comparator comparator={comparator} value={value} />
      <TaxFieldValue pName={pName} value={value} comparator={comparator} />
    </Container>
  )
}

export default enhance(TaxField)
