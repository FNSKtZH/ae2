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
        }
      }
    }
  }
`
