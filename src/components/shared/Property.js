// @flow
import React from 'react'
import TextField from 'material-ui/TextField'
import IconButton from 'material-ui/IconButton'
import Icon from 'material-ui/Icon'
import ClearIcon from 'material-ui-icons/Clear'
import styled from 'styled-components'
import compose from 'recompose/compose'
import withHandlers from 'recompose/withHandlers'
import withState from 'recompose/withState'
import { withApollo } from 'react-apollo'
import omit from 'lodash/omit'

import ErrorBoundary from '../shared/ErrorBoundary'
import updatePropertyMutation from './updatePropertyMutation'

const Container = styled.div`
  margin: 12px 10px 12px 2px;
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-between;
  align-items: flex-end;
  width: 100%;
`
const DeleteButton = styled(IconButton)`
  :hover {
    font-weight: 700;
    background-color: rgba(0, 0, 0, 0.12);
    text-decoration: none;
  }
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
          optimisticResponse: {
            updateObjectById: {
              object: {
                id,
                properties: JSON.stringify(properties),
                __typename: 'Object',
              },
              __typename: 'Object',
            },
            __typename: 'Mutation',
          },
        })
      }
    },
    onDelete: ({
      client,
      field: key,
      properties: propertiesPrevious,
      id,
      objectData,
    }) => async event => {
      const properties = omit(propertiesPrevious, key)
      await client.mutate({
        mutation: updatePropertyMutation,
        variables: { properties: JSON.stringify(properties), id },
      })
    },
  })
)

const Property = ({
  client,
  id,
  properties,
  field: key,
  value,
  onChange,
  onBlur,
  onDelete,
}: {
  client: Object,
  id: string,
  properties: Object,
  key: string,
  value: string,
  onChange: () => void,
  onBlur: () => void,
  onDelete: () => void,
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
        <DeleteButton
          title="Feld löschen"
          aria-label="Feld löschen"
          onClick={onDelete}
        >
          <Icon>
            <ClearIcon color="error" />
          </Icon>
        </DeleteButton>
      </Container>
    </ErrorBoundary>
  )
}

export default enhance(Property)
