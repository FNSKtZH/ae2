import React, { useCallback, useContext } from 'react'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import styled from 'styled-components'
import { observer } from 'mobx-react-lite'

import mobxStoreContext from '../../../../../mobxStoreContext'

const Container = styled.div`
  width: ${(props) => `${props['data-width']}%`};
`
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

const TaxChooser = ({
  taxname,
  pname,
  jsontype,
  count,
  columns,
  propertiesLength,
}) => {
  const mobxStore = useContext(mobxStoreContext)
  const { taxProperties, addTaxProperty, removeTaxProperty } = mobxStore.export

  const checked =
    taxProperties.filter((x) => /*x.taxname === taxname && */ x.pname === pname)
      .length > 0

  const onCheck = useCallback(
    (event, isChecked) => {
      if (isChecked) {
        return addTaxProperty({ taxname, pname })
      }
      removeTaxProperty({ taxname, pname })
    },
    [removeTaxProperty, taxname, pname, addTaxProperty],
  )

  const containerWidth = propertiesLength === 1 ? 100 : 100 / columns

  return (
    <Container data-width={containerWidth}>
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

export default observer(TaxChooser)
