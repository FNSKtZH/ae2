// @flow
import gql from 'graphql-tag'

export default gql`
  mutation deleteTaxonomy($id: UUID!) {
    deleteTaxonomyById(input: { id: $id }) {
      taxonomy {
        id
      }
    }
  }
`
