// @flow
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import get from 'lodash/get'

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
    options: ({ exportTaxonomiesData }: { exportTaxonomiesData: Object }) => {
      const exportTaxonomies = get(exportTaxonomiesData, 'exportTaxonomies', [])
      return {
        variables: {
          exportTaxonomies,
          queryExportTaxonomies: exportTaxonomies.length > 0,
        },
      }
    },
    name: 'propsByTaxData',
  }
)
