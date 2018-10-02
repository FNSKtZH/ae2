import gql from 'graphql-tag'

export default gql`
query AllUsersQuery {
  allUsers {
    totalCount
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
}`
