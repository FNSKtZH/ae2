// @flow
import gql from 'graphql-tag'

export default gql`
  mutation removeExportTaxProperty($taxName: String, $pName: String) {
    removeExportTaxProperty(taxName: $taxName, pName: $pName) @client
  }
`
