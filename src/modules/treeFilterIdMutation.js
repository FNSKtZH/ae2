// @flow
import gql from 'graphql-tag'

export default gql`
  mutation setTreeFilterId($value: Array) {
    setTreeFilterId(value: $value) @client
  }
`
