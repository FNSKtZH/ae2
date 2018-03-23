// @flow
import gql from 'graphql-tag'

export default gql`
  mutation removeExportRcoProperty(
    $pcname: String
    $relationType: String
    $pname: String
  ) {
    removeExportRcoProperty(
      pcname: $pcname
      relationType: $relationType
      pname: $pname
    ) @client
  }
`
