// @flow
import React from 'react'
import TextField from 'material-ui-next/TextField'
import styled from 'styled-components'
import compose from 'recompose/compose'
import withHandlers from 'recompose/withHandlers'
import withState from 'recompose/withState'
import { withApollo } from 'react-apollo'
import format from 'date-fns/format'

import ErrorBoundary from '../shared/ErrorBoundary'
import onBlur from './onBlur'

const Container = styled.div`
  margin: 5px 0;
`

const enhance = compose(
  withApollo,
  withState('value', 'setValue', ({ pC, field }) => pC[field] || ''),
  withHandlers({
    onChange: ({ setValue }) => event => setValue(event.target.value),
    onBlur: ({ client, field, pC, value }) => event =>
      onBlur({
        client,
        field,
        pC,
        value: event.target.value,
        prevValue: pC[field],
      }),
  })
)

const Property = ({
  client,
  field,
  label,
  value,
  helperText,
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
  helperText: Element,
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
          helperText={helperText ? helperText : ''}
        />
      </Container>
    </ErrorBoundary>
  )
}

export default enhance(Property)
