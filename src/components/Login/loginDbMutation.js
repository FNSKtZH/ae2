import { gql } from '@apollo/client'

export default gql`
  mutation logIn($username: String, $pass: String) {
    login(input: { username: $username, pass: $pass }) {
      clientMutationId
      jwtToken
    }
  }
`
