// @flow
import gql from 'graphql-tag'

export default gql`
  mutation deletePCO($id: UUID!) {
    deletePropertyCollectionObjectById(input: { id: $id }) {
      propertyCollectionObject {
        id
      }
    }
  }
`
