// @flow
import gql from 'graphql-tag'

export default gql`
  mutation addExportPcoProperty($pCName: String, $pName: String) {
    addExportPcoProperty(pCName: $pCName, pName: $pName) @client
  }
`
