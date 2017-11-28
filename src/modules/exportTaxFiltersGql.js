// @flow
import gql from 'graphql-tag'

export default gql`
  query exportTaxFiltersQuery {
    exportTaxFilters @client {
      taxName
      pName
      comparator
      value
    }
  }
`
