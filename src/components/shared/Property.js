// @flow
import React from 'react'
import TextField from 'material-ui-next/TextField'
import styled from 'styled-components'
import compose from 'recompose/compose'
import withHandlers from 'recompose/withHandlers'
import withState from 'recompose/withState'
import { withApollo } from 'react-apollo'

import ErrorBoundary from '../shared/ErrorBoundary'
import updatePropertyMutation from './updatePropertyMutation'

const Container = styled.div`
  margin: 12px 10px;
`

const enhance = compose(
  withApollo,
  withState(
    'value',
    'setValue',
    ({ properties, field: key }) => properties[key] || ''
  ),
  withHandlers({
    onChange: ({ setValue }) => event => setValue(event.target.value),
    onBlur: ({
      client,
      field: key,
      properties: propertiesPrevious,
      id,
    }) => event => {
      const { value } = event.target
      const prevValue = propertiesPrevious[key]
      if (value !== prevValue) {
        const properties = {
          ...propertiesPrevious,
          ...{ [key]: value },
        }
        client.mutate({
          mutation: updatePropertyMutation,
          variables: { properties: JSON.stringify(properties), id },
        })
      }
    },
  })
)

const Property = ({
  id,
  properties,
  field: key,
  value,
  onChange,
  onBlur,
}: {
  id: string,
  properties: object,
  key: string,
  value: string,
  onChange: () => void,
  onBlur: () => void,
}) => {
  return (
    <ErrorBoundary>
      <Container>
        <TextField
          label={key}
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
