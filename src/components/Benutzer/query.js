import { gql } from '@apollo/client'

export default gql`
  query userQuery($id: UUID!) {
    userById(id: $id) {
      id
      name
      email
      organizationUsersByUserId {
        nodes {
          id
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
