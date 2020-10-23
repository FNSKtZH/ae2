import { gql } from '@apollo/client'

export default gql`
  mutation deleteTaxonomy($id: UUID!) {
    deleteTaxonomyById(input: { id: $id }) {
      taxonomy {
        id
      }
    }
  }
`
