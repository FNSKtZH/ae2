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

const AllTaxChooser = ({ properties }) => {
  const mobxStore = useContext(mobxStoreContext)
  const { taxProperties, addTaxProperty, removeTaxProperty } = mobxStore.export

  const onCheck = useCallback(
    async (event, isChecked) => {
      for (let p of properties) {
        const taxname = p.taxname ? p.taxname : p.taxonomyName
        const pname = p.propertyName
        if (isChecked) {
          addTaxProperty({ taxname, pname })
        } else {
          removeTaxProperty({ taxname, pname })
        }
      }
    },
    [addTaxProperty, properties, removeTaxProperty],
  )

  const checkedArray = properties.map(p => {
    const taxname = p.taxname ? p.taxname : p.taxonomyName
    return (
      taxProperties.filter(
        x => x.taxname === taxname && x.pname === p.propertyName,
      ).length > 0
    )
  })
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

export default observer(AllTaxChooser)
