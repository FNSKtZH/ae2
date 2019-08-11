// @flow
import React, { useState, useCallback } from 'react'
import TextField from '@material-ui/core/TextField'
import styled from 'styled-components'
import { useApolloClient } from '@apollo/react-hooks'

import ErrorBoundary from '../../../shared/ErrorBoundary'
import updateObjectMutation from '../../updateObjectMutation'

const Container = styled.div`
  margin: 12px 8px 12px 0;
`

const Property = ({
  field,
  label,
  objekt,
  disabled,
}: {
  field: String,
  label: String,
  objekt: Object,
  disabled: Boolean,
}) => {
  const client = useApolloClient()
  const [value, setValue] = useState(objekt[field] || '')

  const onChange = useCallback(event => setValue(event.target.value))
  const onBlur = useCallback(
    event => {
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
    [field, objekt],
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
        />
      </Container>
    </ErrorBoundary>
  )
}

export default Property
