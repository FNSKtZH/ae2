// @flow
import gql from 'graphql-tag'

export default gql`
  mutation setHistoryAfterLogin($value: Array) {
    setHistoryAfterLogin(value: $value) @client {
      historyAfterLogin
    }
  }
`
