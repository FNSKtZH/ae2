// @flow
import gql from 'graphql-tag'

export default gql`
  mutation updateProperty($properties: Object, $id: UUID!) {
    updateObjectById(
      input: { id: $id, objectPatch: { properties: $properties } }
    ) {
      object {
        id
      }
    }
  }
`
