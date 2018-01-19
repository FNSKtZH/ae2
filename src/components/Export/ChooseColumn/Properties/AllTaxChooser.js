//@flow
import React from 'react'
import Checkbox from 'material-ui/Checkbox'
import styled from 'styled-components'
import compose from 'recompose/compose'
import withHandlers from 'recompose/withHandlers'
import { withApollo } from 'react-apollo'

import addExportTaxPropertyMutation from '../../addExportTaxPropertyMutation'
import removeExportTaxPropertyMutation from '../../removeExportTaxPropertyMutation'
import exportTaxPropertiesData from '../../exportTaxPropertiesData'

const Container = styled.div`
  margin-bottom: 16px;
`

const enhance = compose(
  withApollo,
  exportTaxPropertiesData,
  withHandlers({
    onCheck: ({ properties, client }) => (event, isChecked) => {
      const mutation = isChecked
        ? addExportTaxPropertyMutation
        : removeExportTaxPropertyMutation
      properties.forEach(p => {
        const taxname = p.taxname
        const pname = p.propertyName
        client.mutate({
          mutation,
          variables: { taxname, pname },
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
        x => x.taxname === p.taxname && x.pname === p.propertyName
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
