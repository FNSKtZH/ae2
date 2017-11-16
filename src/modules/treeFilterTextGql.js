// @flow
import gql from 'graphql-tag'

export default gql`
  query treeFilterTextQuery {
    treeFilterText @client
  }
`
