// @flow
import gql from 'graphql-tag'

export default gql`
  query exportPcoFilterQuery {
    exportPcoFilters @client {
      pCName
      pName
      comparator
      value
    }
  }
`
