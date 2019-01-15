//@flow
import React, { useCallback, useContext } from 'react'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import styled from 'styled-components'
import { observer } from 'mobx-react-lite'

import mobxStoreContext from '../../../../mobxStoreContext'

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

const AllTaxChooser = ({ properties }: { properties: Array<Object> }) => {
  const mobxStore = useContext(mobxStoreContext)
  const { taxProperties, addTaxProperty, removeTaxProperty } = mobxStore.export

  const checkedArray = properties.map(
    p =>
      taxProperties.filter(
        x => x.taxname === p.taxname && x.pname === p.propertyName,
      ).length > 0,
  )
  const checked = checkedArray.length > 0 && !checkedArray.includes(false)

  const onCheck = useCallback(
    (event, isChecked) => {
      if (isChecked) {
        return properties.forEach(p => {
          const taxname = p.taxonomyName
          const pname = p.propertyName
          addTaxProperty({ taxname, pname })
        })
      }
      properties.forEach(p => {
        const taxname = p.taxonomyName
        const pname = p.propertyName
        removeTaxProperty({ taxname, pname })
      })
    },
    [properties],
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

export default observer(AllTaxChooser)
