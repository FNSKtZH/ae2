// @flow
import React from 'react'
import TextField from 'material-ui/TextField'
import styled from 'styled-components'
import compose from 'recompose/compose'
import withHandlers from 'recompose/withHandlers'
import withState from 'recompose/withState'
import { withApollo } from 'react-apollo'

import ErrorBoundary from '../../shared/ErrorBoundary'
import updateObjectMutation from '../updateObjectMutation'

const Container = styled.div`
  margin: 12px 8px 12px 0;
`

const enhance = compose(
  withApollo,
  withState('value', 'setValue', ({ objekt, field }) => objekt[field] || ''),
  withHandlers({
    onChange: ({ setValue }) => event => setValue(event.target.value),
    onBlur: ({ client, field, objekt }) => event => {
      const { value } = event.target
      if (value !== 'prevValue') {
        client.mutate({
          mutation: updateObjectMutation,
          variables: {
            name: value,
            id: objekt.id,
          },
          optimisticResponse: {
            updateObjectById: {
              object: {
                id: objekt.id,
                name: value,
                __typename: 'Object',
              },
              __typename: 'Object',
            },
            __typename: 'Mutation',
          },
        })
      }
    },
  })
)

const Property = ({
  client,
  field,
  label,
  objekt,
  value,
  disabled,
  onChange,
  onBlur,
}: {
  client: Object,
  field: String,
  label: String,
  objekt: Object,
  disabled: Boolean,
  value: String,
  onChange: () => void,
  onBlur: () => void,
}) => {
  return (
    <ErrorBoundary>
      <Container>
        <TextField
          autoFocus={label === 'Name' && !value}
          label={label}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          fullWidth
          multiline
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck="false"
          disabled={!!disabled}
        />
      </Container>
    </ErrorBoundary>
  )
}

export default enhance(Property)
