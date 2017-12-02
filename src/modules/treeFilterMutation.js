// @flow
import gql from 'graphql-tag'

export default gql`
  mutation setTreeFilter($text: String, $id: UUID) {
    setTreeFilter(text: $text, id: $id) @client
  }
`
