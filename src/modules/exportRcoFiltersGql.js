// @flow
import gql from 'graphql-tag'

export default gql`
  query exportRcoFiltersQuery {
    exportRcoFilters @client {
      pcname
      pname
      comparator
      value
    }
  }
`
