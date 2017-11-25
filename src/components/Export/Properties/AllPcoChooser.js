//@flow
import React from 'react'
import Checkbox from 'material-ui/Checkbox'
import styled from 'styled-components'
import compose from 'recompose/compose'
import withHandlers from 'recompose/withHandlers'
import { graphql, withApollo } from 'react-apollo'

import addExportPcoPropertyMutation from '../../../modules/addExportPcoPropertyMutation'
import removeExportPcoPropertyMutation from '../../../modules/removeExportPcoPropertyMutation'
import exportPcoPropertiesGql from '../../../modules/exportPcoPropertiesGql'

const Container = styled.div`
  margin-bottom: 16px;
`

const exportPcoPropertiesData = graphql(exportPcoPropertiesGql, {
  name: 'exportPcoPropertiesData',
})

const enhance = compose(
  withApollo,
  exportPcoPropertiesData,
  withHandlers({
    onCheck: ({ properties, client }) => (event, isChecked) => {
      const mutation = isChecked
        ? addExportPcoPropertyMutation
        : removeExportPcoPropertyMutation
      properties.forEach(p => {
        const pCName = p.propertyCollectionName
        const pName = p.propertyName
        client.mutate({
          mutation,
          variables: { pCName, pName },
        })
      })
    },
  })
)

const AllPcoChooser = ({
  onCheck,
  properties,
  exportPcoPropertiesData,
}: {
  onCheck: () => {},
  properties: Array<Object>,
  exportPcoPropertiesData: Object,
}) => {
  const exportPcoProperties = exportPcoPropertiesData.exportPcoProperties || []
  const checkedArray = properties.map(
    p =>
      exportPcoProperties.filter(
        x => x.pCName === p.propertyCollectionName && x.pName === p.propertyName
      ).length > 0
  )
  const checked = checkedArray.length > 0 && !checkedArray.includes(false)

  return (
    <Container>
      <Checkbox label="alle" checked={checked} onCheck={onCheck} />
    </Container>
  )
}

export default enhance(AllPcoChooser)
