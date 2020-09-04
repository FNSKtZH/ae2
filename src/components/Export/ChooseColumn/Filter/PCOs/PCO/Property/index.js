import React, { useContext } from 'react'
import styled from 'styled-components'
import { observer } from 'mobx-react-lite'
import { getSnapshot } from 'mobx-state-tree'

import Comparator from './Comparator'
import Value from './Value'
import Checkbox from './Checkbox'
import mobxStoreContext from '../../../../../../../mobxStoreContext'

const Container = styled.div`
  display: flex;
  align-content: stretch;
  padding: 4px 16px;
  width: ${(props) => `${props['data-width']}%`};
  > div {
    height: auto;
  }
`

const PcoProperty = ({
  pcname,
  pname,
  jsontype,
  count,
  columns,
  propertiesLength,
}) => {
  const mobxStore = useContext(mobxStoreContext)
  const { pcoFilters: pcoFiltersPassed } = mobxStore.export
  const pcoFilters = getSnapshot(pcoFiltersPassed)

  const pcoFilter = pcoFilters.find(
    (x) => x.pcname === pcname && x.pname === pname,
  ) || { comparator: null, value: null }
  const { comparator, value } = pcoFilter

  const containerWidth = propertiesLength === 1 ? 100 : 100 / columns

  if (jsontype === 'Boolean') {
    return (
      <Container data-width={containerWidth}>
        <Checkbox pcname={pcname} pname={pname} value={value} />
      </Container>
    )
  }

  return (
    <Container data-width={containerWidth}>
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
