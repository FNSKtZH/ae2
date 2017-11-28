// @flow
import gql from 'graphql-tag'

export default gql`
  mutation addExportTaxFilter(
    $taxName: String
    $pName: String
    $comparator: String
    $value: String
  ) {
    addExportTaxFilter(
      taxName: $taxName
      pName: $pName
      comparator: $comparator
      value: $value
    ) @client
  }
`
