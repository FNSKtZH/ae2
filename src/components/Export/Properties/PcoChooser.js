//@flow
import React from 'react'
import Checkbox from 'material-ui/Checkbox'
import styled from 'styled-components'
import compose from 'recompose/compose'
import withHandlers from 'recompose/withHandlers'
import { withApollo } from 'react-apollo'

import addExportPcoPropertyMutation from '../../../modules/addExportPcoPropertyMutation'
import removeExportPcoPropertyMutation from '../../../modules/removeExportPcoPropertyMutation'
import exportPcoPropertiesData from '../../../modules/exportPcoPropertiesData'

const Container = styled.div``
const Count = styled.span`
  font-size: xx-small;
`

const enhance = compose(
  withApollo,
  exportPcoPropertiesData,
  withHandlers({
    onCheck: ({ pCName, pName, client }) => (event, isChecked) => {
      const mutation = isChecked
        ? addExportPcoPropertyMutation
        : removeExportPcoPropertyMutation
      client.mutate({
        mutation,
        variables: { pCName, pName },
      })
    },
  })
)

const PcoChooser = ({
  pCName,
  pName,
  jsontype,
  count,
  onCheck,
  exportPcoPropertiesData,
}: {
  pCName: string,
  pName: string,
  jsontype: string,
  count: number,
  onCheck: () => {},
  exportPcoPropertiesData: Object,
}) => {
  const exportPcoProperties = exportPcoPropertiesData.exportPcoProperties || []
  const checked =
    exportPcoProperties.filter(x => x.pCName === pCName && x.pName === pName)
      .length > 0

  return (
    <Container>
      <Checkbox
        label={
          <div>
            {pName} <Count title="Anzahl Objekte">{`(${count} Objekte)`}</Count>
          </div>
        }
        checked={checked}
        onCheck={onCheck}
      />
    </Container>
  )
}

export default enhance(PcoChooser)
