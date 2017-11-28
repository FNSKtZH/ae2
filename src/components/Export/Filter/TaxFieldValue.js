//@flow
import React from 'react'
import TextField from 'material-ui/TextField'
import styled from 'styled-components'
import compose from 'recompose/compose'
import withHandlers from 'recompose/withHandlers'
import { graphql, withApollo } from 'react-apollo'

import exportTaxFiltersGql from '../../../modules/exportTaxFiltersGql'
import exportTaxFiltersMutation from '../../../modules/exportTaxFiltersMutation'

const Container = styled.div`
  margin-bottom: 16px;
`

const exportTaxFiltersData = graphql(exportTaxFiltersGql, {
  name: 'exportTaxFiltersData',
})

const enhance = compose(
  withApollo,
  exportTaxFiltersData,
  withHandlers({
    onChange: ({ taxName, pName, comparator, client }) => event =>
      client.mutate({
        mutation: exportTaxFiltersMutation,
        variables: { taxName, pName, comparator, value: event.target.value },
      }),
  })
)

const TaxFieldValue = ({
  pName,
  value,
  properties,
  exportTaxPropertiesData,
  onChange,
}: {
  pName: string,
  value: string,
  properties: Array<Object>,
  exportTaxPropertiesData: Object,
  onChange: () => {},
}) => (
  <Container>
    <TextField
      floatingLabelFixed
      floatingLabelText={pName}
      value={value || ''}
      onChange={onChange}
    />
  </Container>
)

export default enhance(TaxFieldValue)
