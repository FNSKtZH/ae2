// @flow
import gql from 'graphql-tag'

export default gql`
  query activeNodeArrayQuery {
    activeNodeArray @client
  }
`
