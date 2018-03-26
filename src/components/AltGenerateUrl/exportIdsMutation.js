// @flow
import gql from 'graphql-tag'

export default gql`
  mutation setExportIds($value: Array) {
    setExportIds(value: $value) @client
  }
`
