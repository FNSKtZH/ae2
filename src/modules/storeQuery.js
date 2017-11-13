// @flow

import gql from 'graphql-tag'

export default gql`
  query store {
    store @client {
      id
      value
    }
  }
`
