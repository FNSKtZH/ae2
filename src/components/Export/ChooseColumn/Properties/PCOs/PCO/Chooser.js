//@flow
import React, { useCallback } from 'react'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import styled from 'styled-components'
import compose from 'recompose/compose'
import { withApollo } from 'react-apollo'
import get from 'lodash/get'

import addExportPcoPropertyMutation from '../../../../addExportPcoPropertyMutation'
import removeExportPcoPropertyMutation from '../../../../removeExportPcoPropertyMutation'
import withExportPcoPropertiesData from '../../../../withExportPcoPropertiesData'

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
  withExportPcoPropertiesData,
)

const PcoChooser = ({
  pcname,
  pname,
  jsontype,
  count,
  exportPcoPropertiesData,
  client,
}: {
  pcname: string,
  pname: string,
  jsontype: string,
  count: number,
  exportPcoPropertiesData: Object,
  client: Object,
}) => {
  const onCheck = useCallback(
    (event, isChecked) => {
      const mutation = isChecked
        ? addExportPcoPropertyMutation
        : removeExportPcoPropertyMutation
      client.mutate({
        mutation,
        variables: { pcname, pname },
      })
    },
    [pcname, pname],
  )

  const exportPcoProperties = get(
    exportPcoPropertiesData,
    'exportPcoProperties',
    [],
  )
  const checked =
    exportPcoProperties.filter(x => x.pcname === pcname && x.pname === pname)
      .length > 0

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

export default enhance(PcoChooser)
