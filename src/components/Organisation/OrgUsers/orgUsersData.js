// @flow
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import get from 'lodash/get'

export default graphql(
  gql`
    query orgUsersQuery($name: String!) {
      organizationByName(name: $name) {
        id
        name
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
  `,
  {
    options: ({ activeNodeArrayData }) => ({
      variables: {
        name: get(activeNodeArrayData, 'activeNodeArray', ['none', 'none'])[1],
      },
    }),
    name: 'orgUsersData',
  }
)
