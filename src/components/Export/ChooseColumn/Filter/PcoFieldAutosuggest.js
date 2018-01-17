//@flow
import React from 'react'
import styled from 'styled-components'
import compose from 'recompose/compose'

import Comparator from './PcoComparator'
import PcoFieldValue from './PcoFieldValue'
import PcoCheckbox from './PcoCheckbox'
import exportPcoFiltersData from '../../exportPcoFiltersData'
import pcoFieldPropData from './pcoFieldPropData'
import get from 'lodash/get'

const Container = styled.div`
  display: flex;
  align-content: stretch;
  padding: 0 16px;
`

const enhance = compose(exportPcoFiltersData, pcoFieldPropData)

const PcoField = ({
  pcname,
  pname,
  jsontype,
  count,
  exportPcoFiltersData,
  propData,
}: {
  pcname: string,
  pname: string,
  jsontype: string,
  count: number,
  exportPcoFiltersData: Object,
  propData: Object,
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
  const loadingPropData =
    propData && propData.loading ? propData.loading : false
  const propValues = get(propData, 'propValuesFunction.nodes', [])
  console.log('propValues:', propValues)

  return (
    <Container>
      <PcoFieldValue
        pcname={pcname}
        pname={pname}
        value={value}
        comparator={comparator}
        jsontype={jsontype}
      />
      {value !== undefined &&
        value !== null && (
          <Comparator
            pcname={pcname}
            pname={pname}
            comparator={comparator}
            value={value}
          />
        )}
    </Container>
  )
}

export default enhance(PcoField)
