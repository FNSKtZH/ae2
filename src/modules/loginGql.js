// @flow
import gql from 'graphql-tag'

export default gql`
  query loginQuery {
    login @client {
      token
      role
      username
    }
  }
`
