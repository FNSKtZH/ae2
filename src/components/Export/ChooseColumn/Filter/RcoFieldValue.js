//@flow
import React from 'react'
import TextField from 'material-ui/TextField'
import styled from 'styled-components'
import compose from 'recompose/compose'
import withHandlers from 'recompose/withHandlers'
import { withApollo } from 'react-apollo'

import exportRcoFiltersMutation from '../../exportRcoFiltersMutation'
import readableType from '../../../../modules/readableType'

const Container = styled.div`
  width: 100%;
`

const floatingLabelStyle = {
  color: 'rgba(0, 0, 0, 0.5)',
}

const enhance = compose(
  withApollo,
  withHandlers({
    onChange: ({ pcname, pname, comparator, client }) => event => {
      const value = event.target.value
      let comparatorValue = comparator
      if (!comparator && value) comparatorValue = 'ILIKE'
      if (!value) comparatorValue = null
      client.mutate({
        mutation: exportRcoFiltersMutation,
        variables: { pcname, pname, comparator: comparatorValue, value },
      })
    },
  })
)

const RcoFieldValue = ({
  pname,
  value,
  jsontype,
  properties,
  onChange,
}: {
  pname: string,
  value: string,
  jsontype: string,
  properties: Array<Object>,
  onChange: () => {},
}) => (
  <Container>
    <TextField
      floatingLabelFixed
      floatingLabelText={`${pname} (${readableType(jsontype)})`}
      floatingLabelStyle={floatingLabelStyle}
      value={value || ''}
      fullWidth
      onChange={onChange}
    />
  </Container>
)

export default enhance(RcoFieldValue)
