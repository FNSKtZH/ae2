// @flow
import gql from 'graphql-tag'

export default gql`
  query appBarStoreQuery {
    login @client {
      token
      username
    }
    activeNodeArray @client
  }
`
