// @flow
import gql from 'graphql-tag'

export default gql`
  mutation setExportPcoFilters(
    $pCName: String
    $pName: String
    $comparator: String
    $value: String
  ) {
    setExportPcoFilters(
      pCName: $pCName
      pName: $pName
      comparator: $comparator
      value: $value
    ) @client
  }
`
