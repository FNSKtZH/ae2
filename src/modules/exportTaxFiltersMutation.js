// @flow
import gql from 'graphql-tag'

export default gql`
  mutation setExportTaxFilters(
    $taxName: String
    $pName: String
    $comparator: String
    $value: String
  ) {
    setExportTaxFilters(
      taxName: $taxName
      pName: $pName
      comparator: $comparator
      value: $value
    ) @client
  }
`
