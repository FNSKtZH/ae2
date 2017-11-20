// @flow
import gql from 'graphql-tag'

export default gql`
  mutation setTreeFilter($text: String, $id: Uuid) {
    setTreeFilter(text: $text, id: $id) @client
  }
`
