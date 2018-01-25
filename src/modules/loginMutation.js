// @flow
import gql from 'graphql-tag'

export default gql`
  mutation setLogin($token: String!, $username: String!) {
    setLogin(token: $token, username: $username) @client {
      token
      username
    }
  }
`
