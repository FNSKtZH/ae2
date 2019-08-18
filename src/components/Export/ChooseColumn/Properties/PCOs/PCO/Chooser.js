import React, { useCallback, useContext } from 'react'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import styled from 'styled-components'
import { observer } from 'mobx-react-lite'

import mobxStoreContext from '../../../../../../mobxStoreContext'

const Container = styled.div``
const Count = styled.span`
  font-size: xx-small;
`
const Label = styled(FormControlLabel)`
  height: 30px;
  min-height: 30px;
  > span {
    font-weight: 500;
    line-height: 1em;
  }
`

const PcoChooser = ({ pcname, pname, jsontype, count }) => {
  const mobxStore = useContext(mobxStoreContext)
  const { pcoProperties, addPcoProperty, removePcoProperty } = mobxStore.export

  const onCheck = useCallback(
    (event, isChecked) => {
      if (isChecked) {
        return addPcoProperty({ pcname, pname })
      }
      removePcoProperty({ pcname, pname })
    },
    [addPcoProperty, pcname, pname, removePcoProperty],
  )

  const checked =
    pcoProperties.filter(x => x.pcname === pcname && x.pname === pname).length >
    0

  return (
    <Container>
      <Label
        control={
          <Checkbox color="primary" checked={checked} onChange={onCheck} />
        }
        label={
          <div>
            {pname} <Count title="Anzahl Objekte">{`(${count} Objekte)`}</Count>
          </div>
        }
      />
    </Container>
  )
}

export default observer(PcoChooser)
