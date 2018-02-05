// @flow
import gql from 'graphql-tag'

export default gql`
  mutation deletePC($id: UUID!) {
    deletePropertyCollectionById(input: { id: $id }) {
      propertyCollection {
        id
      }
    }
  }
`
