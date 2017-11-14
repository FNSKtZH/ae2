// @flow
import gql from 'graphql-tag'

export default gql`
  mutation setActiveNodeArray($value: Array) {
    setActiveNodeArray(value: $value) @client
  }
`
