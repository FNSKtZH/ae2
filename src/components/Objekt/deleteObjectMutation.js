import { gql } from '@apollo/client'

export default gql`
  mutation deleteObject($id: UUID!) {
    deleteObjectById(input: { id: $id }) {
      object {
        id
      }
    }
  }
`
