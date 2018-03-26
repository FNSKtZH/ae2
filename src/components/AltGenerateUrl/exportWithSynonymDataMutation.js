// @flow
import gql from 'graphql-tag'

export default gql`
  mutation setExportWithSynonymData($value: Array) {
    setExportWithSynonymData(value: $value) @client
  }
`
