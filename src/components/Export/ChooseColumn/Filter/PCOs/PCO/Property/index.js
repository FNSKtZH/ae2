import React, { useContext } from 'react'
import styled from 'styled-components'
import { observer } from 'mobx-react-lite'

import Comparator from './Comparator'
import Value from './Value'
import Checkbox from './Checkbox'
import mobxStoreContext from '../../../../../../../mobxStoreContext'

const Container = styled.div`
  display: flex;
  align-content: stretch;
  padding: 4px 16px;
  > div {
    height: auto;
  }
`

const PcoProperty = ({ pcname, pname, jsontype, count }) => {
  const mobxStore = useContext(mobxStoreContext)
  const { pcoFilters } = mobxStore.export

  const pcoFilter = pcoFilters.find(
    x => x.pcname === pcname && x.pname === pname,
  ) || { comparator: null, value: null }
  const { comparator, value } = pcoFilter

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

export default observer(PcoProperty)
