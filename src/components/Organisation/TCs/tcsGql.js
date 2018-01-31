// @flow
import gql from 'graphql-tag'

export default gql`
  query orgTCsQuery($name: String!) {
    organizationByName(name: $name) {
      id
      taxonomiesByOrganizationId {
        totalCount
        nodes {
          id
          name
        }
      }
    }
  }
`
