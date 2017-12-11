//@flow
import React from 'react'
import TextField from 'material-ui/TextField'
import styled from 'styled-components'
import compose from 'recompose/compose'
import withHandlers from 'recompose/withHandlers'
import { withApollo } from 'react-apollo'

import exportTaxFiltersMutation from '../../../../modules/exportTaxFiltersMutation'

const Container = styled.div`
  width: 100%;
`

const floatingLabelStyle = {
  color: 'rgba(0, 0, 0, 0.5)',
}

const enhance = compose(
  withApollo,
  withHandlers({
    onChange: ({ taxname, pname, comparator, client }) => event =>
      client.mutate({
        mutation: exportTaxFiltersMutation,
        variables: {
          taxname,
          pname,
          comparator: comparator || 'ILIKE',
          value: event.target.value,
        },
      }),
  })
)

const TaxFieldValue = ({
  pname,
  value,
  properties,
  onChange,
}: {
  pname: string,
  value: string,
  properties: Array<Object>,
  onChange: () => {},
}) => (
  <Container>
    <TextField
      floatingLabelFixed
      floatingLabelText={pname}
      floatingLabelStyle={floatingLabelStyle}
      value={value || ''}
      fullWidth
      onChange={onChange}
    />
  </Container>
)

export default enhance(TaxFieldValue)
