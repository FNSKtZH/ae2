// @flow
import React, { useState, useCallback } from 'react'
import TextField from '@material-ui/core/TextField'
import styled from 'styled-components'
import compose from 'recompose/compose'
import { withApollo } from 'react-apollo'
import format from 'date-fns/format'

import ErrorBoundary from '../shared/ErrorBoundary'
import onBlurArten from './onBlurArten'

const Container = styled.div`
  margin: 5px 0;
`

const enhance = compose(withApollo)

const Property = ({
  client,
  taxonomy,
  field,
  label,
  type = 'text',
  disabled,
}: {
  client: Object,
  taxonomy: Object,
  field: String,
  label: String,
  disabled: Boolean,
  type: String,
}) => {
  const [value, setValue] = useState(taxonomy[field] || '')

  const onChange = useCallback(event => setValue(event.target.value))
  const onBlur = useCallback(
    event =>
      onBlurArten({
        client,
        field,
        taxonomy,
        value: event.target.value,
        prevValue: taxonomy[field],
      }),
    [field, taxonomy, value],
  )

  return (
    <ErrorBoundary>
      <Container>
        <TextField
          autoFocus={label === 'Name' && !value}
          label={label}
          value={
            field === 'lastUpdated' && value
              ? format(new Date(value), 'dd.MM.yyyy')
              : value
          }
          onChange={onChange}
          onBlur={onBlur}
          fullWidth
          multiline={type === 'number' ? false : true}
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
