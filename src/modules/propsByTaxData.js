// @flow
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

export default graphql(
  gql`
    query propsByTaxDataQuery(
      $queryExportTaxonomies: Boolean!
      $exportTaxonomies: [String]
    ) {
      pcoPropertiesByTaxonomiesFunction(taxonomyNames: $exportTaxonomies)
        @include(if: $queryExportTaxonomies) {
        nodes {
          propertyCollectionName
          propertyName
          jsontype
          count
        }
      }
      rcoPropertiesByTaxonomiesFunction(taxonomyNames: $exportTaxonomies)
        @include(if: $queryExportTaxonomies) {
        nodes {
          propertyCollectionName
          relationType
          propertyName
          jsontype
          count
        }
      }
      taxPropertiesByTaxonomiesFunction(taxonomyNames: $exportTaxonomies)
        @include(if: $queryExportTaxonomies) {
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
    options: ({ exportTaxonomies }: { exportTaxonomies: Array<Object> }) => ({
      variables: {
        exportTaxonomies,
        queryExportTaxonomies: exportTaxonomies.length > 0,
      },
      // This name is ignored by apollo???!!!
      name: 'propsByTaxData',
    }),
  }
)
