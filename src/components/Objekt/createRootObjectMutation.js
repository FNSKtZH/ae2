import { gql } from '@apollo/client'

export default gql`
  mutation createObject($taxonomyId: UUID!) {
    createObject(input: { object: { taxonomyId: $taxonomyId } }) {
      object {
        id
        taxonomyId
      }
    }
  }
`
