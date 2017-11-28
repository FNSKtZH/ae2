// @flow
import gql from 'graphql-tag'

export default gql`
  mutation exportTaxFilters(
    $taxName: String
    $pName: String
    $comparator: String
    $value: String
  ) {
    exportTaxFilters(
      taxName: $taxName
      pName: $pName
      comparator: $comparator
      value: $value
    ) @client
  }
`
