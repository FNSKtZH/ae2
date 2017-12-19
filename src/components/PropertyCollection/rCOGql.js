// @flow
import gql from 'graphql-tag'

export default gql`
  query rCOQuery($pCId: UUID!) {
    propertyCollectionById(id: $pCId) {
      id
      relationsByPropertyCollectionId {
        totalCount
        nodes {
          id
          objectId
          objectByObjectId {
            name
          }
          objectIdRelation
          objectByObjectIdRelation {
            name
          }
          relationType
          properties
        }
      }
    }
  }
`
