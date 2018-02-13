// @flow
import React from 'react'
import TextField from 'material-ui/TextField'
import { InputLabel } from 'material-ui/Input'
import styled from 'styled-components'
import compose from 'recompose/compose'
import withHandlers from 'recompose/withHandlers'
import withState from 'recompose/withState'
import { withApollo } from 'react-apollo'

import ErrorBoundary from '../shared/ErrorBoundary'
import updatePropertyMutation from './updatePropertyMutation'

const Container = styled.div`
  margin: 20px 10px 12px 10px;
`
const FieldContainer = styled.div`
  width: 100%;
  display: flex;
`

const enhance = compose(
  withApollo,
  withState('label', 'setLabel', ''),
  withState('value', 'setValue', ''),
  withHandlers({
    onChangeLabel: ({ setLabel }) => event => setLabel(event.target.value),
    onChangeValue: ({ setValue }) => event => setValue(event.target.value),
    onBlurValue: ({
      client,
      properties: propertiesPrevious,
      id,
      label,
      setLabel,
      setValue,
    }) => async event => {
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
  })
)

const Property = ({
  id,
  properties,
  label,
  value,
  onChangeLabel,
  onChangeValue,
  onBlurValue,
}: {
  id: string,
  properties: object,
  label: string,
  value: string,
  onChangeLabel: () => void,
  onChangeValue: () => void,
  onBlurValue: () => void,
}) => {
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

export default enhance(Property)
