import { gql } from '@apollo/client'

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
