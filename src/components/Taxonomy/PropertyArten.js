import React, { useState, useCallback } from 'react'
import TextField from '@mui/material/TextField'
import styled from 'styled-components'
import format from 'date-fns/format'
import { useApolloClient } from '@apollo/client'

import onBlurArten from './onBlurArten'
import ErrorBoundary from '../shared/ErrorBoundary'

const Container = styled.div`
  margin: 5px 0;
`

const Property = ({ taxonomy, field, label, type = 'text', disabled }) => {
  const client = useApolloClient()
  const [value, setValue] = useState(taxonomy[field] || '')

  const onChange = useCallback((event) => {
    setValue(event.target.value)
  }, [])
  const onBlur = useCallback(
    (event) =>
      onBlurArten({
        client,
        field,
        taxonomy,
        value: event.target.value,
        prevValue: taxonomy[field],
      }),
    [client, field, taxonomy],
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
          variant="standard"
        />
      </Container>
    </ErrorBoundary>
  )
}

export default Property
