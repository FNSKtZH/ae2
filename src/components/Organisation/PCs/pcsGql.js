// @flow
import gql from 'graphql-tag'

export default gql`
  query orgPCsQuery($name: String!) {
    organizationByName(name: $name) {
      id
      propertyCollectionsByOrganizationId {
        totalCount
        nodes {
          id
          name
        }
      }
    }
  }
`
