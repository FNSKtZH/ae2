// @flow
import React from 'react'
import TextField from 'material-ui-next/TextField'
import styled from 'styled-components'
import compose from 'recompose/compose'
import withHandlers from 'recompose/withHandlers'
import withState from 'recompose/withState'
import { withApollo } from 'react-apollo'

import ErrorBoundary from '../shared/ErrorBoundary'
import updateTaxonomyMutationArten from './updateTaxonomyMutationArten'

const Container = styled.div`
  margin: 12px 10px;
`

const enhance = compose(
  withApollo,
  withState(
    'value',
    'setValue',
    ({ taxonomy, field }) => taxonomy[field] || ''
  ),
  withHandlers({
    onChange: ({ setValue }) => event => setValue(event.target.value),
    onBlur: ({ client, field, taxonomy }) => event => {
      const { value } = event.target
      if (value !== 'prevValue') {
        const variables = {
          id: taxonomy.id,
          name: field === 'name' ? value : taxonomy.name,
          description: field === 'description' ? value : taxonomy.description,
          links: field === 'links' ? value : taxonomy.links,
          organizationId:
            field === 'organizationId' ? value : taxonomy.organizationId,
          lastUpdated: field === 'lastUpdated' ? value : taxonomy.lastUpdated,
          importedBy: field === 'importedBy' ? value : taxonomy.importedBy,
          termsOfUse: field === 'termsOfUse' ? value : taxonomy.termsOfUse,
          type: taxonomy.type,
        }
        client.mutate({
          mutation: updateTaxonomyMutationArten,
          variables,
          optimisticResponse: {
            updateTaxonomyById: {
              taxonomy: {
                id: taxonomy.id,
                name: field === 'name' ? value : taxonomy.name,
                description:
                  field === 'description' ? value : taxonomy.description,
                links: field === 'links' ? value : taxonomy.links,
                organizationId:
                  field === 'organizationId' ? value : taxonomy.organizationId,
                lastUpdated:
                  field === 'lastUpdated' ? value : taxonomy.lastUpdated,
                importedBy:
                  field === 'importedBy' ? value : taxonomy.importedBy,
                termsOfUse:
                  field === 'termsOfUse' ? value : taxonomy.termsOfUse,
                type: taxonomy.type,
                __typename: 'Taxonomy',
              },
              __typename: 'Taxonomy',
            },
            __typename: 'Mutation',
          },
        })
      }
    },
  })
)

const Property = ({
  client,
  field,
  label,
  value,
  disabled,
  onChange,
  onBlur,
}: {
  client: Object,
  field: String,
  label: String,
  disabled: Boolean,
  value: String,
  onChange: () => void,
  onBlur: () => void,
}) => {
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

export default enhance(Property)
