// @flow
import gql from 'graphql-tag'

export default gql`
  mutation setExportPcoProperties($value: Array) {
    setExportPcoProperties(value: $value) @client
  }
`
