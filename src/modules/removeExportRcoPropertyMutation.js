// @flow
import gql from 'graphql-tag'

export default gql`
  mutation removeExportRcoProperty($pcname: String, $pname: String) {
    removeExportRcoProperty(pcname: $pcname, pname: $pname) @client
  }
`
