//@flow
import React, { useCallback, useContext } from 'react'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
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

const AllPcoChooser = ({ properties }) => {
  const mobxStore = useContext(mobxStoreContext)
  const { pcoProperties, addPcoProperty, removePcoProperty } = mobxStore.export

  const onCheck = useCallback(
    (event, isChecked) => {
      if (isChecked) {
        return properties.forEach(p => {
          const pcname = p.propertyCollectionName
          const pname = p.propertyName
          addPcoProperty({ pcname, pname })
        })
      }
      properties.forEach(p => {
        const pcname = p.propertyCollectionName
        const pname = p.propertyName
        removePcoProperty({ pcname, pname })
      })
    },
    [addPcoProperty, properties, removePcoProperty],
  )

  const checkedArray = properties.map(
    p =>
      pcoProperties.filter(
        x =>
          x.pcname === p.propertyCollectionName && x.pname === p.propertyName,
      ).length > 0,
  )
  const checked = checkedArray.length > 0 && !checkedArray.includes(false)

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

export default observer(AllPcoChooser)
