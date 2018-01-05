// @flow
import gql from 'graphql-tag'

export default gql`
  mutation setExportTooManyProperties($value: Array) {
    setExportTooManyProperties(value: $value) @client
  }
`
