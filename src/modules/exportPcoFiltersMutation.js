// @flow
import gql from 'graphql-tag'

export default gql`
  mutation setExportPcoFilters(
    $pcname: String
    $pname: String
    $comparator: String
    $value: String
  ) {
    setExportPcoFilters(
      pcname: $pcname
      pname: $pname
      comparator: $comparator
      value: $value
    ) @client
  }
`
