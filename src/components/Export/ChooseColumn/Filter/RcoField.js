//@flow
import React from 'react'
import styled from 'styled-components'
import compose from 'recompose/compose'

import Comparator from './RcoComparator'
import RcoFieldValue from './RcoFieldValue'
import exportRcoFiltersData from '../../../../modules/exportRcoFiltersData'

const Container = styled.div`
  display: flex;
  align-content: stretch;
  padding: 0 16px;
`

const enhance = compose(exportRcoFiltersData)

const RcoField = ({
  pcname,
  pname,
  jsontype,
  count,
  exportRcoFiltersData,
}: {
  pcname: string,
  pname: string,
  jsontype: string,
  count: number,
  exportRcoFiltersData: Object,
}) => {
  const { exportRcoFilters } = exportRcoFiltersData
  //console.log('RcoField: exportRcoFilters:', exportRcoFilters)
  const exportRcoFilter = exportRcoFilters.find(
    x => x.pcname === pcname && x.pname === pname
  ) || { comparator: null, value: null }
  const { comparator, value } = exportRcoFilter

  return (
    <Container>
      <RcoFieldValue
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

export default enhance(RcoField)
