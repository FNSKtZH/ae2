import { gql } from '@apollo/client'

export default gql`
  mutation updateUser(
    $username: String
    $email: String
    $pass: String
    $id: UUID!
  ) {
    updateUserById(
      input: {
        id: $id
        userPatch: { name: $username, email: $email, pass: $pass }
      }
    ) {
      user {
        id
      }
    }
  }
`
