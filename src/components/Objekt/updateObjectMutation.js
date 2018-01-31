// @flow
import gql from 'graphql-tag'

export default gql`
  mutation updateObject($name: String, $id: UUID!) {
    updateObjectById(input: { id: $id, objectPatch: { name: $name } }) {
      object {
        id
        name
      }
    }
  }
`
