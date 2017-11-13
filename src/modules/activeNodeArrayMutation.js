// @flow
import gql from 'graphql-tag'

export default gql`
  mutation setStore($value: Array) {
    setStore(id: "activeNodeArray", value: $value) @client
  }
`
