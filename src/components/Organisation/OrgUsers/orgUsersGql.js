// @flow
import gql from 'graphql-tag'

export default gql`
  query orgUsersQuery($name: String!) {
    organizationByName(name: $name) {
      id
      organizationUsersByOrganizationId {
        totalCount
        nodes {
          userByUserId {
            id
            name
          }
          role
        }
      }
    }
  }
`
