// @flow
import gql from 'graphql-tag'

export default gql`
  mutation deletePC($id: UUID!) {
    deletePCById(input: { id: $id }) {
      propertyCollection {
        id
      }
    }
  }
`
