// @flow
import gql from 'graphql-tag'

export default gql`
  mutation createObject($taxonomyId: UUID!, $parentId: UUID!) {
    createObject(
      input: { object: { taxonomyId: $taxonomyId, parentId: $parentId } }
    ) {
      object {
        id
        taxonomyId
        parentId
      }
    }
  }
`
