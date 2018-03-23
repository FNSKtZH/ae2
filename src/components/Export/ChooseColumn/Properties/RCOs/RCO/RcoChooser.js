//@flow
import React from 'react'
import { FormControlLabel } from 'material-ui/Form'
import Checkbox from 'material-ui/Checkbox'
import styled from 'styled-components'
import compose from 'recompose/compose'
import withHandlers from 'recompose/withHandlers'
import { withApollo } from 'react-apollo'

import addExportRcoPropertyMutation from '../../../../addExportRcoPropertyMutation'
import removeExportRcoPropertyMutation from '../../../../removeExportRcoPropertyMutation'
import exportRcoPropertiesData from '../../../../exportRcoPropertiesData'

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
  exportRcoPropertiesData,
  withHandlers({
    onCheck: ({ pcname, relationtype, pname, client }) => (
      event,
      isChecked
    ) => {
      const mutation = isChecked
        ? addExportRcoPropertyMutation
        : removeExportRcoPropertyMutation
      client.mutate({
        mutation,
        variables: { pcname, relationtype, pname },
      })
    },
  })
)

const RcoChooser = ({
  pcname,
  relationtype,
  pname,
  jsontype,
  count,
  onCheck,
  exportRcoPropertiesData,
}: {
  pcname: String,
  relationtype: String,
  pname: String,
  jsontype: String,
  count: Number,
  onCheck: () => void,
  exportRcoPropertiesData: Object,
}) => {
  const exportRcoProperties = exportRcoPropertiesData.exportRcoProperties || []
  const checked =
    exportRcoProperties.filter(
      x =>
        x.pcname === pcname &&
        x.relationtype === relationtype &&
        x.pname === pname
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
