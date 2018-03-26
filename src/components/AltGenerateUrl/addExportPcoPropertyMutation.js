// @flow
import gql from 'graphql-tag'

export default gql`
  mutation addExportPcoProperty($pcname: String, $pname: String) {
    addExportPcoProperty(pcname: $pcname, pname: $pname) @client
  }
`
