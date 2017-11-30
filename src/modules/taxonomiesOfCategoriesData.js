// @flow
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

export default graphql(
  gql`
    query taxonomiesOfCategoriesDataQuery {
      taxonomiesOfCategoriesFunction {
        totalCount
        nodes {
          categoryName
          taxonomyName
          objectCount
        }
      }
    }
  `,
  {
    name: 'taxonomiesOfCategoriesData',
  }
)
