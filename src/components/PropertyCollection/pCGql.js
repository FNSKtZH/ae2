// @flow
import gql from 'graphql-tag'

export default gql`
  query pCQuery($pCId: UUID!) {
    propertyCollectionById(id: $pCId) {
      id
      name
      description
      links
      combining
      organizationId
      lastUpdated
      termsOfUse
      importedBy
      organizationByOrganizationId {
        id
        name
      }
      propertyCollectionObjectsByPropertyCollectionId {
        totalCount
      }
    }
    allPropertyCollections {
      nodes {
        id
        name
      }
    }
    allUsers {
      nodes {
        id
        name
        email
        organizationUsersByUserId {
          nodes {
            id
            organizationId
            role
            organizationByOrganizationId {
              id
              name
            }
          }
        }
      }
    }
  }
`
