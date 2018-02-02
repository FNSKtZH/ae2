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
      allOrganizationUsers {
        nodes {
          nodeId
          organizationId
          userId
          role
          userByUserId {
            id
            name
          }
        }
      }
      allUsers {
        nodes {
          id
          name
        }
      }
      allOrganizations {
        nodes {
          id
          name
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
