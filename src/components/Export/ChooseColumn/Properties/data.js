// @flow
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

export default graphql(
  gql`
    query dataQuery {
      allPropertyCollections {
        nodes {
          id
          name
          relationsByPropertyCollectionId {
            totalCount
          }
        }
      }
    }
  `
)
