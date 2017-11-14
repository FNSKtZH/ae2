// @flow
import gql from 'graphql-tag'

export default gql`
  mutation setActiveObjectId($value: Array) {
    setActiveObjectId(value: $value) @client
  }
`
