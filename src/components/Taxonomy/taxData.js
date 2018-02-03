// @flow
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import get from 'lodash/get'

export default graphql(
  gql`
    query taxQuery($taxId: UUID!) {
      taxonomyById(id: $taxId) {
        id
        name
        description
        links
        lastUpdated
        organizationId
        organizationByOrganizationId {
          id
          name
          organizationUsersByOrganizationId {
            nodes {
              id
              role
              userId
              userByUserId {
                id
                name
              }
            }
          }
        }
        importedBy
        userByImportedBy {
          id
          name
        }
        termsOfUse
        habitatLabel
        habitatComments
        habitatNrFnsMin
        habitatNrFnsMax
        type
      }
      allUsers {
        nodes {
          id
          name
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
    }
  `,
  {
    options: ({ activeNodeArrayData }) => ({
      variables: {
        taxId: get(
          activeNodeArrayData,
          'activeNodeArray[1]',
          '99999999-9999-9999-9999-999999999999'
        ),
      },
    }),
    name: 'taxData',
  }
)
