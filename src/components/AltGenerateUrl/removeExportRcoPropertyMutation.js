// @flow
import gql from 'graphql-tag'

export default gql`
  mutation removeExportRcoProperty(
    $pcname: String
    $relationtype: String
    $pname: String
  ) {
    removeExportRcoProperty(
      pcname: $pcname
      relationtype: $relationtype
      pname: $pname
    ) @client
  }
`
