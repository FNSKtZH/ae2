// @flow
import { withClientState } from 'apollo-link-state'

import query from './modules/appQuery'
import variables from './modules/variablesFromStore'

export default () =>
  withClientState({
    Query: {
      // provide initial state
      activeObjectApollo: null,
    },
    Mutation: {
      // update values in the store on mutations
      setActiveObject: (_, activeObject, { cache }) => {
        const data = {
          activeObjectApollo: {
            ...activeObject,
            __typename: 'ActiveObjectApollo',
          },
        }
        cache.writeQuery({ query, variables, data })
        return null
      },
    },
  })
