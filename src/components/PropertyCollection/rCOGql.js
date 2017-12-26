// @flow
import gql from 'graphql-tag'

export default gql`
  query rCOQuery($pCId: UUID!) {
    propertyCollectionById(id: $pCId) {
      id
      organizationByOrganizationId {
        id
        name
        organizationUsersByOrganizationId {
          nodes {
            userId
            role
            userByUserId {
              id
              name
            }
          }
        }
      }
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
