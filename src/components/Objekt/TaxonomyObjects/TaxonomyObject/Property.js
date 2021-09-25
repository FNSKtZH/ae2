import React, { useState, useCallback } from 'react'
import TextField from '@mui/material/TextField'
import styled from 'styled-components'
import { useApolloClient } from '@apollo/client'

import updateObjectMutation from '../../updateObjectMutation'
import ErrorBoundary from '../../../shared/ErrorBoundary'

const Container = styled.div`
  margin: 12px 8px 12px 0;
`

const Property = ({ field, label, objekt, disabled }) => {
  const client = useApolloClient()
  const [value, setValue] = useState(objekt[field] || '')

  const onChange = useCallback((event) => {
    setValue(event.target.value)
  }, [])
  const onBlur = useCallback(
    (event) => {
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
    [client, objekt.id],
  )

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
          variant="standard"
        />
      </Container>
    </ErrorBoundary>
  )
}

export default Property
