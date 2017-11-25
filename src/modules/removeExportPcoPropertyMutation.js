// @flow
import gql from 'graphql-tag'

export default gql`
  mutation removeExportPcoProperty($pCName: String, $pName: String) {
    removeExportPcoProperty(pCName: $pCName, pName: $pName) @client
  }
`
