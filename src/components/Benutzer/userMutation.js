// @flow
import gql from 'graphql-tag'

export default gql`
  mutation editUser(
    $username: String
    $usernameNew: String
    $pass: String
    $passNew: String
    $email: String
  ) {
    editUser(
      input: {
        username: $username
        usernameNew: $usernameNew
        pass: $pass
        passNew: $passNew
        email: $email
      }
    ) {
      clientMutationId
      jwtToken
    }
  }
`
