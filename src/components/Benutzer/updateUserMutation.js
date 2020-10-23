import { gql } from '@apollo/client'

export default gql`
  mutation updateUser($username: String, $email: String, $id: UUID!) {
    updateUserById(
      input: { id: $id, userPatch: { name: $username, email: $email } }
    ) {
      user {
        id
      }
    }
  }
`
