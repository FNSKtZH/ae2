// @flow
import gql from 'graphql-tag'

export default gql`
  mutation addExportTaxProperty($taxName: String, $pName: String) {
    addExportTaxProperty(taxName: $taxName, pName: $pName) @client
  }
`
