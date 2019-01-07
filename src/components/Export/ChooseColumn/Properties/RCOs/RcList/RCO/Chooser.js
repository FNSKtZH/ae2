//@flow
import React, { useCallback } from 'react'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import styled from 'styled-components'
import compose from 'recompose/compose'
import { withApollo } from 'react-apollo'

import addExportRcoPropertyMutation from '../../../../../addExportRcoPropertyMutation'
import removeExportRcoPropertyMutation from '../../../../../removeExportRcoPropertyMutation'
import withExportRcoPropertiesData from '../../../../../withExportRcoPropertiesData'

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

const enhance = compose(
  withApollo,
  withExportRcoPropertiesData,
)

const RcoChooser = ({
  pcname,
  relationtype,
  pname,
  jsontype,
  count,
  exportRcoPropertiesData,
  client,
}: {
  pcname: String,
  relationtype: String,
  pname: String,
  jsontype: String,
  count: Number,
  exportRcoPropertiesData: Object,
  client: Object,
}) => {
  const onCheck = useCallback(
    (event, isChecked) => {
      const mutation = isChecked
        ? addExportRcoPropertyMutation
        : removeExportRcoPropertyMutation
      client.mutate({
        mutation,
        variables: { pcname, relationtype, pname },
      })
    },
    [pcname, relationtype, pname],
  )

  const exportRcoProperties = exportRcoPropertiesData.exportRcoProperties || []
  const checked =
    exportRcoProperties.filter(
      x =>
        x.pcname === pcname &&
        x.relationtype === relationtype &&
        x.pname === pname,
    ).length > 0

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

export default enhance(RcoChooser)
