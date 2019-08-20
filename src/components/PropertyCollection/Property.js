import React, { useState, useCallback } from 'react'
import TextField from '@material-ui/core/TextField'
import FormControl from '@material-ui/core/FormControl'
import styled from 'styled-components'
import format from 'date-fns/format'
import { useApolloClient } from '@apollo/react-hooks'
import ErrorBoundary from 'react-error-boundary'

import onBlurDo from './onBlur'

const Container = styled.div`
  margin: 5px 0;
`
const StyledFormControl = styled(FormControl)`
  width: 100%;
`
const StyledTextField = styled(TextField)`
  p {
    color: ${props => (props.error ? 'red' : 'rgba(0,0,0,0.54)')};
  }
`

const Property = ({
  field,
  label,
  pC,
  helperText,
  type = 'text',
  disabled,
}) => {
  const client = useApolloClient()

  const [value, setValue] = useState(pC[field] || '')
  const [error, setError] = useState(null)

  const onChange = useCallback(event => {
    setValue(event.target.value)
  }, [])
  const onBlur = useCallback(
    event =>
      onBlurDo({
        client,
        field,
        pC,
        value: event.target.value,
        prevValue: pC[field],
        setError,
      }),
    [client, field, pC],
  )

  return (
    <ErrorBoundary>
      <Container>
        <StyledFormControl error={!!error}>
          <StyledTextField
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
            multiline
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
            spellCheck="false"
            disabled={!!disabled}
            type={type}
            helperText={error ? error : helperText ? helperText : ''}
            error={!!error}
          />
        </StyledFormControl>
      </Container>
    </ErrorBoundary>
  )
}

export default Property
