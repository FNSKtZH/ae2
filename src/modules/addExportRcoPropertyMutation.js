// @flow
import gql from 'graphql-tag'

export default gql`
  mutation addExportRcoProperty($pCName: String, $pName: String) {
    addExportRcoProperty(pCName: $pCName, pName: $pName) @client
  }
`
