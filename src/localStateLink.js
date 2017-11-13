// @flow
import { withClientState } from 'apollo-link-state'
import gql from 'graphql-tag'

const storeQuery = gql`
  query store {
    store @client {
      id
      value
    }
  }
`

export default withClientState({
  Query: {
    // provide initial state
    store: () => [],
    activeObject: null,
  },
  Mutation: {
    // update values in the store on mutations
    setStore: (_, { id, value }, { cache }) => {
      const data = {
        store: [
          {
            id,
            value,
            __typename: 'Store',
          },
        ],
      }
      cache.writeQuery({ query: storeQuery, data })
      return null
    },
  },
})
