// @flow
import gql from 'graphql-tag'

export default gql`
  mutation updateUser {
    createUser(input: { user: {} }) {
      user {
        id
        name
        email
      }
    }
  }
`
