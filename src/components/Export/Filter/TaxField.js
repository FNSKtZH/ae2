//@flow
import React from 'react'
import Checkbox from 'material-ui/Checkbox'
import styled from 'styled-components'
import compose from 'recompose/compose'
import withHandlers from 'recompose/withHandlers'
import withState from 'recompose/withState'
import { graphql, withApollo } from 'react-apollo'

import Comparator from './Comparator'
import TaxFieldValue from './TaxFieldValue'
import addExportTaxPropertyMutation from '../../../modules/addExportTaxPropertyMutation'
import removeExportTaxPropertyMutation from '../../../modules/removeExportTaxPropertyMutation'
import exportTaxPropertiesGql from '../../../modules/exportTaxPropertiesGql'

const Container = styled.div`
  display: flex;
`
const Count = styled.span`
  font-size: xx-small;
`

const exportTaxPropertiesData = graphql(exportTaxPropertiesGql, {
  name: 'exportTaxPropertiesData',
})

const enhance = compose(
  withApollo,
  exportTaxPropertiesData,
  withState('comparator', 'setComparator', null),
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

const TaxField = ({
  taxName,
  pName,
  jsontype,
  count,
  onCheck,
  exportTaxPropertiesData,
  comparator,
  setComparator,
}: {
  taxName: string,
  pName: string,
  jsontype: string,
  count: number,
  onCheck: () => {},
  exportTaxPropertiesData: Object,
  comparator: String,
  setComparator: () => {},
}) => {
  const exportTaxProperties = exportTaxPropertiesData.exportTaxProperties || []
  const checked =
    exportTaxProperties.filter(x => x.taxName === taxName && x.pName === pName)
      .length > 0

  return (
    <Container>
      <Comparator comparator={comparator} setComparator={setComparator} />
      <TaxFieldValue pName={pName} />
    </Container>
  )
}

export default enhance(TaxField)
