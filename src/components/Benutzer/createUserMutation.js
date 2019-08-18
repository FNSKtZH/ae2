import gql from 'graphql-tag'

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
