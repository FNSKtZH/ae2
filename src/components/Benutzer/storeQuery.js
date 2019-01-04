// @flow
import gql from 'graphql-tag'

export default gql`
  query benutzerStoreQuery {
    activeNodeArray @client
  }
`
