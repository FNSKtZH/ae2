// @flow
import gql from 'graphql-tag'

export default gql`
  mutation setExportRcoFilters(
    $pcname: String
    $pname: String
    $comparator: String
    $value: String
  ) {
    setExportRcoFilters(
      pcname: $pcname
      pname: $pname
      comparator: $comparator
      value: $value
    ) @client
  }
`
