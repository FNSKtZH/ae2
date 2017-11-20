// @flow
import gql from 'graphql-tag'

export default gql`
  query treeFilterQuery {
    treeFilter @client {
      text
      id
    }
  }
`
