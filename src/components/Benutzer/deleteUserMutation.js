// @flow
import gql from 'graphql-tag'

export default gql`
  mutation deleteUser($id: UUID!) {
    deleteUserById(input: { id: $id }) {
      user {
        id
      }
    }
  }
`
