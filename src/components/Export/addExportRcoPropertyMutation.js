// @flow
import gql from 'graphql-tag'

export default gql`
  mutation addExportRcoProperty(
    $pcname: String
    $relationType: String
    $pname: String
  ) {
    addExportRcoProperty(
      pcname: $pcname
      relationType: $relationType
      pname: $pname
    ) @client
  }
`
