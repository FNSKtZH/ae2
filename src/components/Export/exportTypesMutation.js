// @flow
import gql from 'graphql-tag'

export default gql`
  mutation setExportTypes($value: Array) {
    setExportTypes(value: $value) @client
  }
`
