// @flow
import gql from 'graphql-tag'

export default gql`
  mutation deleteObject($id: UUID!) {
    deleteObjectById(input: { id: $id }) {
      object {
        id
      }
    }
  }
`
