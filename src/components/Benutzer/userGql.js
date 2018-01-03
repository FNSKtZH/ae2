// @flow
import gql from 'graphql-tag'

export default gql`
  query userQuery($id: UUID!) {
    categoriesOfTaxonomiesFunction {
      nodes {
        taxonomyId
        categoryName
      }
    }
    userById(id: $id) {
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
