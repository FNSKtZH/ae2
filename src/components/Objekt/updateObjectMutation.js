// @flow
import gql from 'graphql-tag'

export default gql`
  mutation updateObject($field: String, $value: String, $id: UUID!) {
    updateObjectById(
      input: { id: $id, objectPatch: { [field]: $value } }
    ) {
      object {
        id
      }
    }
  }
`
