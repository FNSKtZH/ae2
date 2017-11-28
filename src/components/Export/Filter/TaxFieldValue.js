//@flow
import React from 'react'
import TextField from 'material-ui/TextField'
import styled from 'styled-components'
import compose from 'recompose/compose'
import withHandlers from 'recompose/withHandlers'
import { graphql, withApollo } from 'react-apollo'

import exportTaxPropertiesGql from '../../../modules/exportTaxPropertiesGql'

const Container = styled.div`
  margin-bottom: 16px;
`

const exportTaxPropertiesData = graphql(exportTaxPropertiesGql, {
  name: 'exportTaxPropertiesData',
})

const enhance = compose(
  withApollo,
  exportTaxPropertiesData,
  withHandlers({
    onChange: () => () => {
      // TODO
    },
  })
)

const TaxFieldValue = ({
  pName,
  properties,
  exportTaxPropertiesData,
  onChange,
}: {
  pName: string,
  properties: Array<Object>,
  exportTaxPropertiesData: Object,
  onChange: () => {},
}) => {
  const exportTaxProperties = exportTaxPropertiesData.exportTaxProperties || []

  return (
    <Container>
      <TextField floatingLabelText={pName} value={''} onChange={onChange} />
    </Container>
  )
}

export default enhance(TaxFieldValue)
