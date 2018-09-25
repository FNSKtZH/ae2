// @flow
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import get from 'lodash/get'

export default graphql(
  gql`
    query filterSuggestionsQuery($treeFilterText: String!) {
      propertyCollectionByPropertyName(propertyName: $treeFilterText) {
        nodes {
          id
          name
        }
      }
      objectByObjectName(objectName: $treeFilterText) {
        nodes {
          id
          name
          taxonomyByTaxonomyId {
            id
            type
          }
        }
      }
    }
  `,
  {
    options: ({ treeFilterData }: { treeFilterData: Object }) => ({
      variables: {
        treeFilterText: get(treeFilterData, 'treeFilter.text') || 'ZZZZ',
      },
    }),
    name: 'filterSuggestionsData',
  }
)
