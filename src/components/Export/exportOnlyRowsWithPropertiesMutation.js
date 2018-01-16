// @flow
import gql from 'graphql-tag'

export default gql`
  mutation setExportOnlyRowsWithProperties($value: Array) {
    setExportOnlyRowsWithProperties(value: $value) @client
  }
`
