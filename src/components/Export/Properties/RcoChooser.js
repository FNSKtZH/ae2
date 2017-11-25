//@flow
import React from 'react'
import Checkbox from 'material-ui/Checkbox'
import styled from 'styled-components'
import compose from 'recompose/compose'
import withHandlers from 'recompose/withHandlers'
import { graphql, withApollo } from 'react-apollo'

import addExportRcoPropertyMutation from '../../../modules/addExportRcoPropertyMutation'
import removeExportRcoPropertyMutation from '../../../modules/removeExportRcoPropertyMutation'
import exportRcoPropertiesGql from '../../../modules/exportRcoPropertiesGql'

const Container = styled.div``

const exportRcoPropertiesData = graphql(exportRcoPropertiesGql, {
  name: 'exportRcoPropertiesData',
})

const enhance = compose(
  withApollo,
  exportRcoPropertiesData,
  withHandlers({
    onCheck: ({ pCName, pName, client }) => (event, isChecked) => {
      const mutation = isChecked
        ? addExportRcoPropertyMutation
        : removeExportRcoPropertyMutation
      client.mutate({
        mutation,
        variables: { pCName, pName },
      })
    },
  })
)

const RcoChooser = ({
  pCName,
  pName,
  jsontype,
  //count,
  onCheck,
  exportRcoPropertiesData,
}: {
  pCName: string,
  pName: string,
  jsontype: string,
  //count: number,
  onCheck: () => {},
  exportRcoPropertiesData: Object,
}) => {
  const exportRcoProperties = exportRcoPropertiesData.exportRcoProperties || []
  const checked =
    exportRcoProperties.filter(x => x.pCName === pCName && x.pName === pName)
      .length > 0

  return (
    <Container>
      <Checkbox label={pName} checked={checked} onCheck={onCheck} />
    </Container>
  )
}

export default enhance(RcoChooser)
