// @flow
import React from 'react'
import TextField from 'material-ui-next/TextField'
import styled from 'styled-components'
import compose from 'recompose/compose'
import withHandlers from 'recompose/withHandlers'
import withState from 'recompose/withState'
import { withApollo } from 'react-apollo'

import ErrorBoundary from '../../shared/ErrorBoundary'
import updateObjectMutation from '../updateObjectMutation'

const Container = styled.div`
  margin: 12px 10px;
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
            name: field === 'name' ? value : objekt.name,
            category: field === 'category' ? value : objekt.category,
            id: objekt.id,
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
  onChange,
  onBlur,
}: {
  client: Object,
  field: String,
  label: String,
  objekt: Object,
  value: String,
  onChange: () => void,
  onBlur: () => void,
}) => {
  return (
    <ErrorBoundary>
      <Container>
        <TextField
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
        />
      </Container>
    </ErrorBoundary>
  )
}

export default enhance(Property)
