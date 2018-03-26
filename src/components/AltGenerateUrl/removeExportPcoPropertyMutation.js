// @flow
import gql from 'graphql-tag'

export default gql`
  mutation removeExportPcoProperty($pcname: String, $pname: String) {
    removeExportPcoProperty(pcname: $pcname, pname: $pname) @client
  }
`
