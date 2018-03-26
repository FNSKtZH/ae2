// @flow
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

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
      const exportTaxonomies = [
        'CSCF (2009)',
        'NISM (2010)',
        'SISF Index 2 (2005)',
      ]

      return {
        variables: {
          exportTaxonomies,
        },
      }
    },
    name: 'propsByTaxData',
  }
)
