// @flow
import gql from 'graphql-tag'

export default gql`
  mutation setLogin($token: String!, $role: String!, $username: String!) {
    setLogin(token: $token, role: $role, username: $username) @client
  }
`
