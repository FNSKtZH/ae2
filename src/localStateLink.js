// @flow
import { withClientState } from 'apollo-link-state'
import gql from 'graphql-tag'

const listElementsQuery = gql`
  query listElements {
    listElements @client {
      id
    }
  }
`
const activeObjectQuery = gql`
  query testObject {
    activeObject @client
  }
`

export default withClientState({
  Query: {
    // provide initial state
    listElements: () => [],
    activeObject: null,
  },
  Mutation: {
    // update values in the store on mutations
    setTestList: (_, { id }, { cache }) => {
      const data = {
        listElements: [
          {
            id,
            __typename: 'TestList',
          },
        ],
      }
      cache.writeQuery({ query: listElementsQuery, data })
      return null
    },
    setActiveObject: (_, { id }, { cache }) => {
      const data = { activeObject: id }
      cache.writeQuery({ query: activeObjectQuery, data })
      return null
    },
  },
})
