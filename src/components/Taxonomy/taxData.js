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
        organizationByOrganizationId {
          id
          name
        }
        isCategoryStandard
        userByImportedBy {
          id
          name
        }
        termsOfUse
        habitatLabel
        habitatComments
        habitatNrFnsMin
        habitatNrFnsMax
      }
    }
  `,
  {
    options: ({ activeNodeArrayData }) => ({
      variables: {
        taxId: get(
          activeNodeArrayData,
          'activeNodeArray[2]',
          '99999999-9999-9999-9999-999999999999'
        ),
      },
    }),
    name: 'taxData',
  }
)
