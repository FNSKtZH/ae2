//@flow
import React from 'react'
import Checkbox from 'material-ui/Checkbox'
import styled from 'styled-components'
import compose from 'recompose/compose'
import withHandlers from 'recompose/withHandlers'
import { graphql, withApollo } from 'react-apollo'

import addExportPcoPropertyMutation from '../../../modules/addExportPcoPropertyMutation'
import removeExportPropertyMutation from '../../../modules/removeExportPropertyMutation'
import exportPcoPropertiesGql from '../../../modules/exportPcoPropertiesGql'

const Container = styled.div``

const exportPcoPropertiesData = graphql(exportPcoPropertiesGql, {
  name: 'exportPcoPropertiesData',
})

const enhance = compose(
  withApollo,
  exportPcoPropertiesData,
  withHandlers({
    onCheck: ({ pCName, pName, client }) => (event, isChecked) => {
      const mutation = isChecked
        ? addExportPcoPropertyMutation
        : removeExportPropertyMutation
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
  //count,
  onCheck,
  exportPcoPropertiesData,
}: {
  pCName: string,
  pName: string,
  jsontype: string,
  //count: number,
  onCheck: () => {},
  exportPcoPropertiesData: Object,
}) => {
  const exportPcoProperties = exportPcoPropertiesData.exportPcoProperties || []
  const exportPcoProperty = exportPcoProperties.filter(
    x => x.pCName === pCName && x.pName === pName
  )
  const checked = exportPcoProperty.length > 0

  return (
    <Container>
      <Checkbox label={pName} checked={checked} onCheck={onCheck} />
    </Container>
  )
}

export default enhance(PcoChooser)
