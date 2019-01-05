//@flow
import React from 'react'
import styled from 'styled-components'
import gql from 'graphql-tag'
import { useQuery } from 'react-apollo-hooks'

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
  query exportRcoFiltersQuery {
    exportRcoFilters @client {
      pcname
      pname
      relationtype
      comparator
      value
    }
  }
`

const RcoField = ({
  pcname,
  relationtype,
  pname,
  jsontype,
  count,
}: {
  pcname: String,
  relationtype: String,
  pname: String,
  jsontype: String,
  count: Number,
}) => {
  const { data: exportRcoFiltersData } = useQuery(storeQuery, {
    suspend: false,
  })
  const { exportRcoFilters } = exportRcoFiltersData
  const exportRcoFilter = exportRcoFilters.find(
    x =>
      x.pcname === pcname &&
      x.relationtype === relationtype &&
      x.pname === pname,
  ) || { comparator: null, value: null }
  const { comparator, value } = exportRcoFilter

  return (
    <Container>
      <Value
        pcname={pcname}
        relationtype={relationtype}
        pname={pname}
        value={value}
        comparator={comparator}
        jsontype={jsontype}
      />
      {value !== undefined && value !== null && (
        <Comparator
          pcname={pcname}
          relationtype={relationtype}
          pname={pname}
          comparator={comparator}
          value={value}
        />
      )}
    </Container>
  )
}

export default RcoField
