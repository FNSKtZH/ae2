//@flow
import React from 'react'
import TextField from 'material-ui/TextField'
import styled from 'styled-components'
import compose from 'recompose/compose'
import withHandlers from 'recompose/withHandlers'
import { withApollo } from 'react-apollo'

import exportRcoFiltersMutation from '../../../../modules/exportRcoFiltersMutation'

const Container = styled.div`
  width: 100%;
`

const floatingLabelStyle = {
  color: 'rgba(0, 0, 0, 0.5)',
}

const enhance = compose(
  withApollo,
  withHandlers({
    onChange: ({ pCName, pName, comparator, client }) => event =>
      client.mutate({
        mutation: exportRcoFiltersMutation,
        variables: { pCName, pName, comparator, value: event.target.value },
      }),
  })
)

const RcoFieldValue = ({
  pName,
  value,
  properties,
  onChange,
}: {
  pName: string,
  value: string,
  properties: Array<Object>,
  onChange: () => {},
}) => (
  <Container>
    <TextField
      floatingLabelFixed
      floatingLabelText={pName}
      floatingLabelStyle={floatingLabelStyle}
      value={value || ''}
      fullWidth
      onChange={onChange}
    />
  </Container>
)

export default enhance(RcoFieldValue)
