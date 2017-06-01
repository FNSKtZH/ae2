// @flow
import { graphql } from 'react-relay'

export default graphql`
  {
    allDataTypes {
      nodes {
        nameGerman
        propertyCollectionsByDataType {
          totalCount
        }
        relationCollectionsByDataType {
          totalCount
        }
        categoriesByDataType {
          totalCount
          nodes {
            id
            name
            taxonomiesByCategory {
              totalCount
              nodes {
                id
                name
                isCategoryStandard
                taxonomyObjectsByTaxonomyId(condition: {level: 1}) {
                  totalCount
                }
              }
            }
          }
        }
      }
    }
  }
`
