// @flow
import gql from 'graphql-tag'

export default gql`
  mutation editExportTaxFilter(
    $taxname: String
    $pname: String
    $comparator: String
    $value: String
  ) {
    editExportTaxFilter(
      taxname: $taxname
      pname: $pname
      comparator: $comparator
      value: $value
    ) @client
  }
`
