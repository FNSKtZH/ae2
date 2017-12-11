// @flow
import gql from 'graphql-tag'

export default gql`
  mutation addExportTaxProperty($taxname: String, $pname: String) {
    addExportTaxProperty(taxname: $taxname, pname: $pname) @client
  }
`
