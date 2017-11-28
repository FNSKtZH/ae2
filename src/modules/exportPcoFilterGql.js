// @flow
import gql from 'graphql-tag'

export default gql`
  query exportPcoFilterQuery {
    exportPcoFilter @client {
      pCName
      pName
      comparator
      value
    }
  }
`
