// @flow
/**
 * this did not work
 * had to build qgl for activeNodeArray only
 */

import gql from 'graphql-tag'

export default gql`
  query localData {
    activeNodeArray @client {
      value
    }
    activeObjectId @client {
      value
    }
  }
`
