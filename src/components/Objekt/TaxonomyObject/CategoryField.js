// @flow
import React from 'react'
import { InputLabel } from 'material-ui-next/Input'
import { MenuItem } from 'material-ui-next/Menu'
import { FormControl } from 'material-ui-next/Form'
import Select from 'material-ui-next/Select'
import styled from 'styled-components'
import compose from 'recompose/compose'
import withHandlers from 'recompose/withHandlers'
import withState from 'recompose/withState'
import { withApollo } from 'react-apollo'
import get from 'lodash/get'

import ErrorBoundary from '../../shared/ErrorBoundary'
import updateObjectMutation from '../updateObjectMutation'
import categoryData from './categoryFieldData'

const Container = styled.div`
  margin: 12px 10px !important;
  width: inherit;
`
const StyledFormControl = styled(FormControl)`
  width: 100%;
`

const enhance = compose(
  withApollo,
  categoryData,
  withState('value', 'setValue', ({ objekt }) => objekt.category || ''),
  withHandlers({
    onChange: ({
      client,
      field,
      objekt,
      value: prevValue,
      setValue,
    }) => async event => {
      const { value } = event.target
      if (value !== prevValue) {
        setValue(event.target.value)
        await client.mutate({
          mutation: updateObjectMutation,
          variables: {
            name: objekt.name,
            category: value,
            id: objekt.id,
          },
        })
      }
    },
  })
)

const Property = ({
  value,
  objekt,
  onChange,
  categoryData,
}: {
  value: String,
  objekt: Object,
  onBonChangeonChangelur: () => void,
  categoryData: Object,
}) => {
  const categories = get(categoryData, 'allCategories.nodes', [])

  return (
    <ErrorBoundary>
      <Container>
        <StyledFormControl>
          <InputLabel htmlFor="category">Gruppe</InputLabel>
          <Select
            value={value}
            onChange={onChange}
            inputProps={{
              id: 'category',
            }}
          >
            {categories.map(c => (
              <MenuItem key={c.name} value={c.name}>
                {c.name}
              </MenuItem>
            ))}
          </Select>
        </StyledFormControl>
      </Container>
    </ErrorBoundary>
  )
}

export default enhance(Property)
