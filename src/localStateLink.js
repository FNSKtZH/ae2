// @flow
import { withClientState } from 'apollo-link-state'
import gql from 'graphql-tag'

const query = gql`
  query ActiveObjectsQuery {
    activeobjects @client {
      id
      name
    }
  }
`

export default () =>
  withClientState({
    Query: {
      // provide initial state
      activeobjects: () => [],
    },
    Mutation: {
      // update values in the store on mutations
      setActiveObject: (_, { id, name }, { cache }) => {
        const data = {
          activeobjects: [{ id, name, __typename: 'activeobject' }],
        }
        cache.writeQuery({ query, data })
        return null
      },
    },
  })
