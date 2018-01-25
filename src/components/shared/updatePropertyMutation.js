// @flow
import gql from 'graphql-tag'

export default gql`
  mutation updateProperty($properties: JSON!, $id: UUID!) {
    updateObjectById(
      input: { id: $id, objectPatch: { properties: $properties } }
    ) {
      object {
        id
        properties
      }
    }
  }
`
