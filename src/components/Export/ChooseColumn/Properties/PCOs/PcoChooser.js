//@flow
import React from 'react'
import { FormControlLabel } from 'material-ui/Form'
import Checkbox from 'material-ui/Checkbox'
import styled from 'styled-components'
import compose from 'recompose/compose'
import withHandlers from 'recompose/withHandlers'
import { withApollo } from 'react-apollo'
import get from 'lodash/get'

import addExportPcoPropertyMutation from '../../../addExportPcoPropertyMutation'
import removeExportPcoPropertyMutation from '../../../removeExportPcoPropertyMutation'
import exportPcoPropertiesData from '../../../exportPcoPropertiesData'

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
  exportPcoPropertiesData,
  withHandlers({
    onCheck: ({ pcname, pname, client }) => (event, isChecked) => {
      const mutation = isChecked
        ? addExportPcoPropertyMutation
        : removeExportPcoPropertyMutation
      client.mutate({
        mutation,
        variables: { pcname, pname },
      })
    },
  })
)

const PcoChooser = ({
  pcname,
  pname,
  jsontype,
  count,
  onCheck,
  exportPcoPropertiesData,
}: {
  pcname: string,
  pname: string,
  jsontype: string,
  count: number,
  onCheck: () => {},
  exportPcoPropertiesData: Object,
}) => {
  const exportPcoProperties = get(
    exportPcoPropertiesData,
    'exportPcoProperties',
    []
  )
  //const exportPcoProperties = exportPcoPropertiesData.exportPcoProperties || []
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
