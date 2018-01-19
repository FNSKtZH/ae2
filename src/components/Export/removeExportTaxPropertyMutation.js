// @flow
import gql from 'graphql-tag'

export default gql`
  mutation removeExportTaxProperty($taxname: String, $pname: String) {
    removeExportTaxProperty(taxname: $taxname, pname: $pname) @client
  }
`
