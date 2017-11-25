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

const Container = styled.div`
  margin-left: 16px;
`

const exportRcoPropertiesData = graphql(exportRcoPropertiesGql, {
  name: 'exportRcoPropertiesData',
})

const enhance = compose(
  withApollo,
  exportRcoPropertiesData,
  withHandlers({
    onCheck: ({ properties, client }) => (event, isChecked) => {
      const mutation = isChecked
        ? addExportRcoPropertyMutation
        : removeExportRcoPropertyMutation
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

const AllRcoChooser = ({
  onCheck,
  properties,
  exportRcoPropertiesData,
}: {
  onCheck: () => {},
  properties: Array<Object>,
  exportRcoPropertiesData: Object,
}) => {
  const exportRcoProperties = exportRcoPropertiesData.exportRcoProperties || []
  const checkedArray = properties.map(
    p =>
      exportRcoProperties.filter(
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

export default enhance(AllRcoChooser)
