// @flow
import gql from 'graphql-tag'

export default gql`
  mutation setExportRcoFilters(
    $pCName: String
    $pName: String
    $comparator: String
    $value: String
  ) {
    setExportRcoFilters(
      pCName: $pCName
      pName: $pName
      comparator: $comparator
      value: $value
    ) @client
  }
`
