// @flow

import gql from 'graphql-tag'

export default gql`
  query activeObjectId {
    activeObjectId @client {
      value
    }
  }
`
