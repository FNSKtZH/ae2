// @flow
import gql from 'graphql-tag'

export default gql`
  mutation createTaxonomy($type: TaxonomyType!, $importedBy: UUID!) {
    createTaxonomy(
      input: { taxonomy: { type: $type, importedBy: $importedBy } }
    ) {
      taxonomy {
        id
      }
    }
  }
`
