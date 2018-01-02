// @flow
import gql from 'graphql-tag'

export default gql`
  query orgQuery($orgName: String!) {
    organizationByName(name: $orgName) {
      id
      name
      links
      contact
      userByContact {
        id
        name
        email
      }
      propertyCollectionsByOrganizationId {
        totalCount
        nodes {
          id
          name
        }
      }
      taxonomiesByOrganizationId {
        totalCount
        nodes {
          id
          name
        }
      }
      organizationUsersByOrganizationId {
        totalCount
        nodes {
          userByUserId {
            id
            name
            email
          }
          role
        }
      }
    }
  }
`
