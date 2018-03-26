// @flow
import gql from 'graphql-tag'

export default gql`
  mutation setExportType($value: String) {
    setExportType(value: $value) @client
  }
`
