// @flow
import React from 'react'
import TextField from 'material-ui-next/TextField'
import styled from 'styled-components'
import compose from 'recompose/compose'
import withHandlers from 'recompose/withHandlers'
import withState from 'recompose/withState'
import { withApollo } from 'react-apollo'

import ErrorBoundary from '../shared/ErrorBoundary'
import updateObjectMutation from '../updateObjectMutation'

const Container = styled.div`
  margin: 12px 10px;
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-between;
  align-items: flex-end;
  width: 100%;
`

const enhance = compose(
  withApollo,
  withState('value', 'setValue', ({ value }) => value || ''),
  withHandlers({
    onChange: ({ setValue }) => event => setValue(event.target.value),
    onBlur: ({ client, field, id }) => event => {
      const { value } = event.target
      if (value !== 'prevValue') {
        client.mutate({
          mutation: updateObjectMutation,
          variables: { [field]: value, id },
        })
      }
    },
  })
)

const Property = ({
  client,
  id,
  field,
  value,
  onChange,
  onBlur,
}: {
  client: Object,
  id: string,
  field: string,
  value: string,
  onChange: () => void,
  onBlur: () => void,
}) => {
  return (
    <ErrorBoundary>
      <Container>
        <TextField
          label={field}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          fullWidth
          multiline
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck="false"
        />
      </Container>
    </ErrorBoundary>
  )
}

export default enhance(Property)
