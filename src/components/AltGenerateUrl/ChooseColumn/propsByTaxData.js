// @flow
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

import constants from '../../../modules/constants'

export default graphql(
  gql`
    query propsByTaxDataQuery($exportTaxonomies: [String]) {
      pcoPropertiesByTaxonomiesFunction(taxonomyNames: $exportTaxonomies) {
        nodes {
          propertyCollectionName
          propertyName
          jsontype
          count
        }
      }
      rcoPropertiesByTaxonomiesFunction(taxonomyNames: $exportTaxonomies) {
        nodes {
          propertyCollectionName
          relationType
          propertyName
          jsontype
          count
        }
      }
      taxPropertiesByTaxonomiesFunction(taxonomyNames: $exportTaxonomies) {
        nodes {
          taxonomyName
          propertyName
          jsontype
          count
        }
      }
    }
  `,
  {
    options: ({ exportTaxonomiesData }: { exportTaxonomiesData: Object }) => {
      const exportTaxonomies = constants.altTaxonomies

      return {
        variables: {
          exportTaxonomies,
        },
      }
    },
    name: 'propsByTaxData',
  }
)
