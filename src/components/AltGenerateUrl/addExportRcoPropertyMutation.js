// @flow
import gql from 'graphql-tag'

export default gql`
  mutation addExportRcoProperty(
    $pcname: String
    $relationtype: String
    $pname: String
  ) {
    addExportRcoProperty(
      pcname: $pcname
      relationtype: $relationtype
      pname: $pname
    ) @client
  }
`
