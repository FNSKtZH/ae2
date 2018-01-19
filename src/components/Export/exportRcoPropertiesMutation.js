// @flow
import gql from 'graphql-tag'

export default gql`
  mutation setExportRcoProperties($value: Array) {
    setExportRcoProperties(value: $value) @client
  }
`
