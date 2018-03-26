// @flow
import gql from 'graphql-tag'

export default gql`
  query exportPcoFiltersQuery {
    exportPcoFilters @client {
      pcname
      pname
      comparator
      value
    }
  }
`
