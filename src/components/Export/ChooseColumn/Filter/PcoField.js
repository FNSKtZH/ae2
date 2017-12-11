//@flow
import React from 'react'
import styled from 'styled-components'
import compose from 'recompose/compose'

import Comparator from './PcoComparator'
import PcoFieldValue from './PcoFieldValue'
import exportPcoFiltersData from '../../../../modules/exportPcoFiltersData'

const Container = styled.div`
  display: flex;
  align-content: stretch;
  padding: 0 16px;
`

const enhance = compose(exportPcoFiltersData)

const PcoField = ({
  pCName,
  pName,
  jsontype,
  count,
  exportPcoFiltersData,
}: {
  pCName: string,
  pName: string,
  jsontype: string,
  count: number,
  exportPcoFiltersData: Object,
}) => {
  const { exportPcoFilters } = exportPcoFiltersData
  //console.log('PcoField: exportPcoFilters:', exportPcoFilters)
  const exportPcoFilter = exportPcoFilters.find(
    x => x.pCName === pCName && x.pName === pName
  ) || { comparator: null, value: null }
  const { comparator, value } = exportPcoFilter

  return (
    <Container>
      <PcoFieldValue
        pCName={pCName}
        pName={pName}
        value={value}
        comparator={comparator}
      />
      <Comparator
        pCName={pCName}
        pName={pName}
        comparator={comparator}
        value={value}
      />
    </Container>
  )
}

export default enhance(PcoField)
