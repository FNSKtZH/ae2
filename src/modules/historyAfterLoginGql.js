// @flow
import gql from 'graphql-tag'

export default gql`
  query historyAfterLoginDataQuery {
    historyAfterLogin @client
  }
`
