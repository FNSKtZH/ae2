// @flow
import gql from 'graphql-tag'

export default gql`
  mutation removeExportRcoProperty($pCName: String, $pName: String) {
    removeExportRcoProperty(pCName: $pCName, pName: $pName) @client
  }
`
