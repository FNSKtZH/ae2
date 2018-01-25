// @flow
import gql from 'graphql-tag'

export default gql`
  mutation setEditingTaxonomies($value: Boolean) {
    setEditingTaxonomies(value: $value) @client {
      editingTaxonomies
    }
  }
`
