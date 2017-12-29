// @flow
import gql from 'graphql-tag'

export default gql`
  mutation editUser(
    $username: String
    $username_new: String
    $pass: String
    $pass_new: String
    $email: String
  ) {
    editUser(
      input: {
        username: $username
        username_new: $username_new
        pass: $pass
        pass_new: $pass_new
        email: $email
      }
    ) {
      clientMutationId
      jwtToken
    }
  }
`
