// @flow
import gql from 'graphql-tag'

export default gql`
  mutation setTreeFilterText($value: Array) {
    setTreeFilterText(value: $value) @client
  }
`
