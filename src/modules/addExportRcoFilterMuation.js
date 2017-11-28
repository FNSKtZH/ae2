// @flow
import gql from 'graphql-tag'

export default gql`
  mutation addExportRcoFilter(
    $pCName: String
    $pName: String
    $comparator: String
    $value: String
  ) {
    addExportRcoFilter(
      pCName: $pCName
      pName: $pName
      comparator: $comparator
      value: $value
    ) @client
  }
`
