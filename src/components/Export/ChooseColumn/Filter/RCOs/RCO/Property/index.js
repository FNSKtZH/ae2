import React, { useContext } from 'react'
import styled from 'styled-components'
import { observer } from 'mobx-react-lite'

import Comparator from './Comparator'
import Value from './Value'
import mobxStoreContext from '../../../../../../../mobxStoreContext'

const Container = styled.div`
  display: flex;
  align-content: stretch;
  padding: 4px 16px;
  > div {
    height: auto;
  }
`

const RcoField = ({ pcname, relationtype, pname, jsontype, count }) => {
  const mobxStore = useContext(mobxStoreContext)
  const { rcoFilters } = mobxStore.export

  const exportRcoFilter = rcoFilters.find(
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

export default observer(RcoField)
