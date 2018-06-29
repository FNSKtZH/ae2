// @flow
import gql from 'graphql-tag'

export default gql`
  mutation setExportRcoFilters(
    $pcname: String
    $relationtype: String
    $pname: String
    $comparator: String
    $value: String
  ) {
    setExportRcoFilters(
      pcname: $pcname
      relationtype: $relationtype
      pname: $pname
      comparator: $comparator
      value: $value
    ) @client
  }
`
