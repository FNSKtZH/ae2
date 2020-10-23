import { gql } from '@apollo/client'

export default gql`
  mutation createUser {
    createUser(input: { user: {} }) {
      user {
        id
        name
        email
      }
    }
  }
`
