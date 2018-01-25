// @flow
import gql from 'graphql-tag'

export default gql`
  mutation updateObject($name: String, $category: String, $id: UUID!) {
    updateObjectById(
      input: { id: $id, objectPatch: { name: $name, category: $category } }
    ) {
      object {
        id
        name
        category
      }
    }
  }
`
