// @flow
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

export default graphql(
  gql`
    query AllTaxonomiesQuery {
      allTaxonomies {
        nodes {
          id
          name
          type
        }
      }
    }
  `,
  {
    name: 'taxonomiesData',
  },
)
