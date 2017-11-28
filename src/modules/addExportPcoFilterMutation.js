// @flow
import gql from 'graphql-tag'

export default gql`
  mutation addExportPcoFilter(
    $pCName: String
    $pName: String
    $comparator: String
    $value: String
  ) {
    addExportPcoFilter(
      pCName: $pCName
      pName: $pName
      comparator: $comparator
      value: $value
    ) @client
  }
`
