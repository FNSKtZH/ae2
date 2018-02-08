// @flow
import gql from 'graphql-tag'

export default gql`
  query pCOQuery($pCId: UUID!) {
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
              email
            }
          }
        }
      }
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
