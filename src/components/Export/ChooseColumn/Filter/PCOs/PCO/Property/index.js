//@flow
import React from 'react'
import styled from 'styled-components'
import { useQuery } from 'react-apollo-hooks'

import Comparator from './Comparator'
import Value from './Value'
import Checkbox from './Checkbox'
import exportPcoFiltersQuery from '../../../../../exportPcoFiltersGql'

const Container = styled.div`
  display: flex;
  align-content: stretch;
  padding: 4px 16px;
  > div {
    height: auto;
  }
`

const PcoProperty = ({
  pcname,
  pname,
  jsontype,
  count,
}: {
  pcname: string,
  pname: string,
  jsontype: string,
  count: number,
}) => {
  const { data } = useQuery(exportPcoFiltersQuery, {
    suspend: false,
  })
  const { exportPcoFilters } = data
  const exportPcoFilter = exportPcoFilters.find(
    x => x.pcname === pcname && x.pname === pname,
  ) || { comparator: null, value: null }
  const { comparator, value } = exportPcoFilter

  if (jsontype === 'Boolean') {
    return <Checkbox pcname={pcname} pname={pname} value={value} />
  }

  return (
    <Container>
      <Value
        key={`${pcname}/${pname}/${jsontype}`}
        pcname={pcname}
        pname={pname}
        value={value}
        comparator={comparator}
        jsontype={jsontype}
      />
      {value !== undefined && value !== null && value !== ' ' && (
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

export default PcoProperty
