// @flow
import gql from 'graphql-tag'

export default gql`
  mutation removeExportTaxFilter(
    $taxName: String
    $pName: String
    $comparator: String
    $value: String
  ) {
    removeExportTaxFilter(
      taxName: $taxName
      pName: $pName
      comparator: $comparator
      value: $value
    ) @client
  }
`
