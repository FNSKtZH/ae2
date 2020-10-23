import { gql } from '@apollo/client'

export default gql`
  mutation deleteUser($id: UUID!) {
    deleteUserById(input: { id: $id }) {
      user {
        id
      }
    }
  }
`
