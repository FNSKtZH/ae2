import { gql } from '@apollo/client'

export default gql`
  mutation deletePC($id: UUID!) {
    deletePropertyCollectionById(input: { id: $id }) {
      propertyCollection {
        id
      }
    }
  }
`
