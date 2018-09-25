// @flow
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

export default graphql(
  gql`
    query loginQuery {
      login @client {
        token
        username
      }
    }
  `,
  {
    name: 'loginData',
  }
)
