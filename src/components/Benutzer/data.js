// @flow
import { graphql } from 'react-apollo'
import get from 'lodash/get'
import gql from 'graphql-tag'

export default graphql(
  gql`
    query userQuery($id: UUID!) {
      login @client {
        token
        username
      }
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
  `,
  {
    options: ({ activeNodeArrayData }) => ({
      variables: {
        id:
          get(activeNodeArrayData, 'activeNodeArray', [])[1] ||
          '99999999-9999-9999-9999-999999999999',
      },
    }),
    name: 'data',
  }
)
