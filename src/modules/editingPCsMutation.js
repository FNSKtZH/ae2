// @flow
import gql from 'graphql-tag'

export default gql`
  mutation setEditingPCs($value: Boolean) {
    setEditingPCs(value: $value) @client {
      editingPCs
    }
  }
`
