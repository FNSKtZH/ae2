// @flow
import gql from 'graphql-tag'

export default gql`
  mutation setExportCategories($value: Array) {
    setExportCategories(value: $value) @client
  }
`
