// @flow
import gql from 'graphql-tag'

export default gql`
  mutation setExportAddFilterFields($value: Boolean) {
    setExportAddFilterFields(value: $value) @client
  }
`
