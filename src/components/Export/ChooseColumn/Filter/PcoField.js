//@flow
import React from 'react'
import styled from 'styled-components'
import compose from 'recompose/compose'

import Comparator from './PcoComparator'
import PcoFieldValue from './PcoFieldValue'
import PcoCheckbox from './PcoCheckbox'
import exportPcoFiltersData from '../../../../modules/exportPcoFiltersData'

const Container = styled.div`
  display: flex;
  align-content: stretch;
  padding: 0 16px;
`

const enhance = compose(exportPcoFiltersData)

const PcoField = ({
  pcname,
  pname,
  jsontype,
  count,
  exportPcoFiltersData,
}: {
  pcname: string,
  pname: string,
  jsontype: string,
  count: number,
  exportPcoFiltersData: Object,
}) => {
  const { exportPcoFilters } = exportPcoFiltersData
  //console.log('PcoField: exportPcoFilters:', exportPcoFilters)
  const exportPcoFilter = exportPcoFilters.find(
    x => x.pcname === pcname && x.pname === pname
  ) || { comparator: null, value: null }
  const { comparator, value } = exportPcoFilter
  if (jsontype === 'Boolean') {
    return <PcoCheckbox pcname={pcname} pname={pname} value={value} />
  }

  return (
    <Container>
      <PcoFieldValue
        pcname={pcname}
        pname={pname}
        value={value}
        comparator={comparator}
      />
      <Comparator
        pcname={pcname}
        pname={pname}
        comparator={comparator}
        value={value}
      />
    </Container>
  )
}

export default enhance(PcoField)
