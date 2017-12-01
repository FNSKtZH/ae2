// @flow
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import get from 'lodash/get'

export default graphql(
  gql`
    query filterSuggestionsQuery($treeFilterText: String!) {
      filterSuggestionsPC: propertyCollectionByPropertyName(
        propertyName: $treeFilterText
      ) {
        nodes {
          id
          name
        }
      }
      filterSuggestionsTO: objectByObjectName(objectName: $treeFilterText) {
        nodes {
          id
          name
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
