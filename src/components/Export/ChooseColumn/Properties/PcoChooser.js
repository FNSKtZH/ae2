//@flow
import React from 'react'
import Checkbox from 'material-ui/Checkbox'
import styled from 'styled-components'
import compose from 'recompose/compose'
import withHandlers from 'recompose/withHandlers'
import { withApollo } from 'react-apollo'

import addExportPcoPropertyMutation from '../../../../modules/addExportPcoPropertyMutation'
import removeExportPcoPropertyMutation from '../../../../modules/removeExportPcoPropertyMutation'
import exportPcoPropertiesData from '../../exportPcoPropertiesData'

const Container = styled.div``
const Count = styled.span`
  font-size: xx-small;
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
  const exportPcoProperties = exportPcoPropertiesData.exportPcoProperties || []
  const checked =
    exportPcoProperties.filter(x => x.pcname === pcname && x.pname === pname)
      .length > 0

  return (
    <Container>
      <Checkbox
        label={
          <div>
            {pname} <Count title="Anzahl Objekte">{`(${count} Objekte)`}</Count>
          </div>
        }
        checked={checked}
        onCheck={onCheck}
      />
    </Container>
  )
}

export default enhance(PcoChooser)
