// @flow
import gql from 'graphql-tag'

export default gql`
  mutation addExportRcoProperty($pcname: String, $pname: String) {
    addExportRcoProperty(pcname: $pcname, pname: $pname) @client
  }
`
