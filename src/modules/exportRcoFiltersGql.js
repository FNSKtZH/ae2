// @flow
import gql from 'graphql-tag'

export default gql`
  query exportRcoFiltersQuery {
    exportRcoFilters @client {
      pCName
      pName
      comparator
      value
    }
  }
`
