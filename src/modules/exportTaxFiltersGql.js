// @flow
import gql from 'graphql-tag'

export default gql`
  query exportTaxFiltersQuery {
    exportTaxFilters @client {
      taxname
      pname
      comparator
      value
    }
  }
`
