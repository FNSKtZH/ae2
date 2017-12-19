// @flow
import gql from 'graphql-tag'

export default gql`
  query pCOQuery($pCId: UUID!) {
    propertyCollectionById(id: $pCId) {
      id
      propertyCollectionObjectsByPropertyCollectionId {
        totalCount
        nodes {
          id
          objectId
          objectByObjectId {
            name
          }
          properties
        }
      }
    }
  }
`
