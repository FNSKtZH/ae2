// @flow
import gql from 'graphql-tag'

export default gql`
  mutation setExportTaxProperties($value: Array) {
    setExportTaxProperties(value: $value) @client
  }
`
