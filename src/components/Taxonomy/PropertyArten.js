// @flow
import React from 'react'
import TextField from '@material-ui/core/TextField'
import styled from 'styled-components'
import compose from 'recompose/compose'
import withHandlers from 'recompose/withHandlers'
import withState from 'recompose/withState'
import { withApollo } from 'react-apollo'
import format from 'date-fns/format'

import ErrorBoundary from '../shared/ErrorBoundary'
import onBlur from './onBlurArten'

const Container = styled.div`
  margin: 5px 0;
`

const enhance = compose(
  withApollo,
  withState(
    'value',
    'setValue',
    ({ taxonomy, field }) => taxonomy[field] || ''
  ),
  withHandlers({
    onChange: ({ setValue }) => event => setValue(event.target.value),
    onBlur: ({ client, field, taxonomy, value }) => event =>
      onBlur({
        client,
        field,
        taxonomy,
        value: event.target.value,
        prevValue: taxonomy[field],
      }),
  })
)

const Property = ({
  client,
  field,
  label,
  value,
  type = 'text',
  disabled,
  onChange,
  onBlur,
}: {
  client: Object,
  field: String,
  label: String,
  disabled: Boolean,
  value: String,
  type: String,
  onChange: () => void,
  onBlur: () => void,
}) => {
  return (
    <ErrorBoundary>
      <Container>
        <TextField
          autoFocus={label === 'Name' && !value}
          label={label}
          value={
            field === 'lastUpdated' && value
              ? format(new Date(value), 'DD.MM.YYYY')
              : value
          }
          onChange={onChange}
          onBlur={onBlur}
          fullWidth
          multiline
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck="false"
          disabled={!!disabled}
          type={type}
        />
      </Container>
    </ErrorBoundary>
  )
}

export default enhance(Property)
