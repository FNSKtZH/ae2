// @flow
import gql from 'graphql-tag'

export default gql`
  query exportRcoFilterQuery {
    exportRcoFilters @client {
      pCName
      pName
      comparator
      value
    }
  }
`
