// @flow
import gql from 'graphql-tag'

export default gql`
  query exportTaxFilterQuery {
    exportTaxFilter @client {
      taxName
      pName
      comparator
      value
    }
  }
`
