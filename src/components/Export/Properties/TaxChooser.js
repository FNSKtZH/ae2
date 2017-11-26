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

const Container = styled.div``
const Count = styled.span`
  font-style: italic;
  font-size: xx-small;
`

const exportTaxPropertiesData = graphql(exportTaxPropertiesGql, {
  name: 'exportTaxPropertiesData',
})

const enhance = compose(
  withApollo,
  exportTaxPropertiesData,
  withHandlers({
    onCheck: ({ taxName, pName, client }) => (event, isChecked) => {
      const mutation = isChecked
        ? addExportTaxPropertyMutation
        : removeExportTaxPropertyMutation
      client.mutate({
        mutation,
        variables: { taxName, pName },
      })
    },
  })
)

const TaxChooser = ({
  taxName,
  pName,
  jsontype,
  count,
  onCheck,
  exportTaxPropertiesData,
}: {
  taxName: string,
  pName: string,
  jsontype: string,
  count: number,
  onCheck: () => {},
  exportTaxPropertiesData: Object,
}) => {
  const exportTaxProperties = exportTaxPropertiesData.exportTaxProperties || []
  const checked =
    exportTaxProperties.filter(x => x.taxName === taxName && x.pName === pName)
      .length > 0

  return (
    <Container>
      <Checkbox
        label={
          <div>
            {pName} <Count title="Anzahl Objekte">{`(${count})`}</Count>
          </div>
        }
        checked={checked}
        onCheck={onCheck}
      />
    </Container>
  )
}

export default enhance(TaxChooser)
