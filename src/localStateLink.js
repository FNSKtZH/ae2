// @flow
import { withClientState } from 'apollo-link-state'
import gql from 'graphql-tag'

const query = gql`
  query activeObjects {
    activeObjects @client {
      id
    }
  }
`

export default withClientState({
  Query: {
    // provide initial state
    activeObjects: () => [],
  },
  Mutation: {
    // update values in the store on mutations
    setActiveObject: (_, { id }, { cache }) => {
      const data = {
        activeObjects: [
          {
            id,
            __typename: 'ActiveObject',
          },
        ],
      }
      cache.writeQuery({ query, data })
      return null
    },
  },
})
