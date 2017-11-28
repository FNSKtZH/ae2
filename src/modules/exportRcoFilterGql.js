// @flow
import gql from 'graphql-tag'

export default gql`
  query exportRcoFilterQuery {
    exportRcoFilter @client {
      pCName
      pName
      comparator
      value
    }
  }
`
