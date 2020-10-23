import { gql } from '@apollo/client'

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
