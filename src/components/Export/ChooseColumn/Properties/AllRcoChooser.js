//@flow
import React from 'react'
import Checkbox from 'material-ui/Checkbox'
import styled from 'styled-components'
import compose from 'recompose/compose'
import withHandlers from 'recompose/withHandlers'
import { withApollo } from 'react-apollo'

import addExportRcoPropertyMutation from '../../../../modules/addExportRcoPropertyMutation'
import removeExportRcoPropertyMutation from '../../../../modules/removeExportRcoPropertyMutation'
import exportRcoPropertiesData from '../../../../modules/exportRcoPropertiesData'

const Container = styled.div`
  margin-bottom: 16px;
`

const enhance = compose(
  withApollo,
  exportRcoPropertiesData,
  withHandlers({
    onCheck: ({ properties, client }) => (event, isChecked) => {
      const mutation = isChecked
        ? addExportRcoPropertyMutation
        : removeExportRcoPropertyMutation
      properties.forEach(p => {
        const pcname = p.propertyCollectionName
        const pname = p.propertyName
        client.mutate({
          mutation,
          variables: { pcname, pname },
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
        x => x.pcname === p.propertyCollectionName && x.pname === p.propertyName
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
