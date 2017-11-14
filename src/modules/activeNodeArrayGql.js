// @flow

import gql from 'graphql-tag'

export default gql`
  query activeNodeArray {
    activeNodeArray @client {
      value
    }
  }
`
