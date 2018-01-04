// @flow
import gql from 'graphql-tag'

export default gql`
  query orgUsersQuery($name: String!) {
    organizationByName(name: $name) {
      id
      organizationUsersByOrganizationId {
        totalCount
        nodes {
          id
          organizationId
          userId
          nodeId
          userByUserId {
            id
            name
          }
          role
        }
      }
    }
    allUsers {
      nodes {
        id
        name
      }
    }
    allRoles {
      nodes {
        name
      }
    }
  }
`
