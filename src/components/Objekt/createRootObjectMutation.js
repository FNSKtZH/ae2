// @flow
import gql from 'graphql-tag'

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
