// @flow
import React, { useState, useCallback } from 'react'
import TextField from '@material-ui/core/TextField'
import InputLabel from '@material-ui/core/InputLabel'
import styled from 'styled-components'
import { useApolloClient } from '@apollo/react-hooks'

import ErrorBoundary from '../shared/ErrorBoundary'
import updatePropertyMutation from './updatePropertyMutation'

const Container = styled.div`
  margin: 20px 10px 12px 0;
`
const FieldContainer = styled.div`
  width: 100%;
  display: flex;
`

const Property = ({
  id,
  properties: propertiesPrevious,
}: {
  id: string,
  properties: object,
}) => {
  const client = useApolloClient()

  const [label, setLabel] = useState('')
  const [value, setValue] = useState('')

  const onChangeLabel = useCallback(event => {
    setLabel(event.target.value)
  }, [])
  const onChangeValue = useCallback(event => {
    setValue(event.target.value)
  }, [])
  const onBlurValue = useCallback(
    async event => {
      const { value } = event.target
      if (value !== null && value !== undefined && !!label) {
        const properties = {
          ...propertiesPrevious,
          ...{ [label]: value },
        }
        await client.mutate({
          mutation: updatePropertyMutation,
          variables: { properties: JSON.stringify(properties), id },
        })
        setLabel('')
        setValue('')
      }
    },
    [label, propertiesPrevious, client, id],
  )

  return (
    <ErrorBoundary>
      <Container>
        <InputLabel>Neues Feld:</InputLabel>
        <FieldContainer>
          <TextField
            label="Feld-Name"
            value={label}
            onChange={onChangeLabel}
            fullWidth
            multiline
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
            spellCheck="false"
          />
          {!!label && (
            <TextField
              label="Feld-Wert"
              value={value}
              onChange={onChangeValue}
              onBlur={onBlurValue}
              fullWidth
              multiline
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="off"
              spellCheck="false"
            />
          )}
        </FieldContainer>
      </Container>
    </ErrorBoundary>
  )
}

export default Property
