// @flow
import gql from 'graphql-tag'

export default gql`
  mutation logIn($username: String, $pass: String) {
    login(input: { username: $username, pass: $pass }) {
      clientMutationId
      jwtToken
    }
  }
`
