// @flow
import gql from 'graphql-tag'

export default gql`
  mutation editExportTaxFilter(
    $taxName: String
    $pName: String
    $comparator: String
    $value: String
  ) {
    editExportTaxFilter(
      taxName: $taxName
      pName: $pName
      comparator: $comparator
      value: $value
    ) @client
  }
`
