import React, { useCallback, useContext } from 'react'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import styled from 'styled-components'
import { observer } from 'mobx-react-lite'

import mobxStoreContext from '../../../../../../mobxStoreContext'

const Container = styled.div`
  margin-bottom: 16px;
`
const Label = styled(FormControlLabel)`
  height: 30px;
  min-height: 30px;
  > span {
    font-weight: 500;
    line-height: 1em;
  }
`

const AllRcoChooser = ({ properties }) => {
  const mobxStore = useContext(mobxStoreContext)
  const { removeRcoProperty, addRcoProperty, rcoProperties } = mobxStore.export

  const checkedArray = properties.map(
    p =>
      rcoProperties.filter(
        x =>
          x.pcname === p.propertyCollectionName &&
          x.relationtype === p.relationType &&
          x.pname === p.propertyName,
      ).length > 0,
  )
  const checked = checkedArray.length > 0 && !checkedArray.includes(false)

  const onCheck = useCallback(
    (event, isChecked) => {
      if (isChecked) {
        return properties.forEach(p => {
          const pcname = p.propertyCollectionName
          const relationtype = p.relationType
          const pname = p.propertyName
          addRcoProperty({ pcname, relationtype, pname })
        })
      }
      properties.forEach(p => {
        const pcname = p.propertyCollectionName
        const relationtype = p.relationType
        const pname = p.propertyName
        removeRcoProperty({ pcname, relationtype, pname })
      })
    },
    [addRcoProperty, properties, removeRcoProperty],
  )

  return (
    <Container>
      <Label
        control={
          <Checkbox color="primary" checked={checked} onChange={onCheck} />
        }
        label="alle"
      />
    </Container>
  )
}

export default observer(AllRcoChooser)
