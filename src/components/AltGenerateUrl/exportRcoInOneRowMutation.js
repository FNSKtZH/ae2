// @flow
import gql from 'graphql-tag'

export default gql`
  mutation setExportRcoInOneRow($value: Array) {
    setExportRcoInOneRow(value: $value) @client
  }
`
