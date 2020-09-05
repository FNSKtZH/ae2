import React, { useCallback, useContext } from 'react'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import styled from 'styled-components'
import { observer } from 'mobx-react-lite'

import mobxStoreContext from '../../../../../../../mobxStoreContext'

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

const RcoChooser = ({
  pcname,
  relationtype,
  pname,
  jsontype,
  count,
  columns,
  propertiesLength,
}) => {
  const mobxStore = useContext(mobxStoreContext)
  const { rcoProperties, addRcoProperty, removeRcoProperty } = mobxStore.export

  const onCheck = useCallback(
    (event, isChecked) => {
      if (isChecked) {
        return addRcoProperty({ pcname, relationtype, pname })
      }
      removeRcoProperty({ pcname, relationtype, pname })
    },
    [removeRcoProperty, pcname, relationtype, pname, addRcoProperty],
  )

  const checked =
    rcoProperties.filter(
      (x) =>
        x.pcname === pcname &&
        x.relationtype === relationtype &&
        x.pname === pname,
    ).length > 0

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

export default observer(RcoChooser)
