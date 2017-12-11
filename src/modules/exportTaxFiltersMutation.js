// @flow
import gql from 'graphql-tag'

export default gql`
  mutation setExportTaxFilters(
    $taxname: String
    $pname: String
    $comparator: String
    $value: String
  ) {
    setExportTaxFilters(
      taxname: $taxname
      pname: $pname
      comparator: $comparator
      value: $value
    ) @client
  }
`
