// @flow
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import get from 'lodash/get'

export default graphql(
  gql`
    query categoryQuery($name: String!) {
      categoryByName(name: $name) {
        id
        name
      }
    }
  `,
  {
    options: ({ activeNodeArrayData }) => ({
      variables: {
        name: get(activeNodeArrayData, 'activeNodeArray[1]', ''),
      },
    }),
    name: 'categoryData',
  }
)
