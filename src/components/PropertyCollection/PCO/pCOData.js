// @flow
import { graphql } from 'react-apollo'
import get from 'lodash/get'
import gql from 'graphql-tag'

export default graphql(
  gql`
    query pCOQuery($pCId: UUID!) {
      propertyCollectionById(id: $pCId) {
        id
        organizationByOrganizationId {
          id
          name
          organizationUsersByOrganizationId {
            nodes {
              userId
              role
              userByUserId {
                id
                name
                email
              }
            }
          }
        }
        propertyCollectionObjectsByPropertyCollectionId {
          totalCount
          nodes {
            id
            objectId
            objectByObjectId {
              name
            }
            properties
          }
        }
      }
    }
  `,
  {
    options: ({ activeNodeArrayData }) => ({
      variables: {
        pCId: get(
          activeNodeArrayData,
          'activeNodeArray[1]',
          '99999999-9999-9999-9999-999999999999'
        ),
      },
    }),
    name: 'pCOData',
  }
)
