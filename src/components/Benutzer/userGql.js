// @flow
import gql from 'graphql-tag'

export default gql`
  query userQuery($name: String!) {
    userByName(name: $name) {
      id
      name
      email
      organizationUsersByUserId {
        nodes {
          organizationByOrganizationId {
            id
            name
          }
          role
        }
      }
      propertyCollectionsByImportedBy {
        nodes {
          id
          name
        }
      }
      taxonomiesByImportedBy {
        nodes {
          id
          name
        }
      }
    }
  }
`
