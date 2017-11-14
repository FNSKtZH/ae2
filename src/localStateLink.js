// @flow
import { withClientState } from 'apollo-link-state'

import storeQuery from './modules/storeQuery'

export default withClientState({
  Query: {
    // provide initial state
    store: () => [
      {
        id: 'activeNodeArray',
        value: [],
        __typename: 'Store',
      },
      {
        id: 'activeObject',
        value: null,
        __typename: 'Store',
      },
    ],
  },
  Mutation: {
    // update values in the store on mutations
    setStore: (_, { id, value }, { cache }) => {
      /**
       * fetching current makes code in autorun run before
       * mutation is finished!!! > errors
       */
      //const current = cache.readQuery({ query: storeQuery })
      //console.log('localStateLink: current:', current)
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
