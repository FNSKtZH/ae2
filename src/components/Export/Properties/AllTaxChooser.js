//@flow
import React from 'react'
import Checkbox from 'material-ui/Checkbox'
import styled from 'styled-components'
import compose from 'recompose/compose'
import withHandlers from 'recompose/withHandlers'
import { graphql, withApollo } from 'react-apollo'

import addExportTaxPropertyMutation from '../../../modules/addExportTaxPropertyMutation'
import removeExportTaxPropertyMutation from '../../../modules/removeExportTaxPropertyMutation'
import exportTaxPropertiesGql from '../../../modules/exportTaxPropertiesGql'

const Container = styled.div`
  margin-left: 16px;
`

const exportTaxPropertiesData = graphql(exportTaxPropertiesGql, {
  name: 'exportTaxPropertiesData',
})

const enhance = compose(
  withApollo,
  exportTaxPropertiesData,
  withHandlers({
    onCheck: ({ properties, client }) => (event, isChecked) => {
      const mutation = isChecked
        ? addExportTaxPropertyMutation
        : removeExportTaxPropertyMutation
      properties.forEach(p => {
        const taxName = p.taxonomyName
        const pName = p.propertyName
        client.mutate({
          mutation,
          variables: { taxName, pName },
        })
      })
    },
  })
)

const AllTaxChooser = ({
  onCheck,
  properties,
  exportTaxPropertiesData,
}: {
  onCheck: () => {},
  properties: Array<Object>,
  exportTaxPropertiesData: Object,
}) => {
  const exportTaxProperties = exportTaxPropertiesData.exportTaxProperties || []
  const checkedArray = properties.map(
    p =>
      exportTaxProperties.filter(
        x => x.taxName === p.taxonomyName && x.pName === p.propertyName
      ).length > 0
  )
  const checked = checkedArray.length > 0 && !checkedArray.includes(false)

  return (
    <Container>
      <Checkbox label="alle" checked={checked} onCheck={onCheck} />
    </Container>
  )
}

export default enhance(AllTaxChooser)
