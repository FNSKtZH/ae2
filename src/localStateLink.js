// @flow
import { withClientState } from 'apollo-link-state'
import app from 'ampersand-app'
import isEqual from 'lodash/isEqual'

import activeNodeArrayGql from './modules/activeNodeArrayGql'
import treeFilterTextGql from './modules/treeFilterTextGql'
import treeFilterIdGql from './modules/treeFilterIdGql'
import getActiveNodeArrayFromPathname from './modules/getActiveNodeArrayFromPathname'

export default withClientState({
  Query: {
    // provide initial state
    activeNodeArray: () => [],
    treeFilterText: () => '',
    treeFilterId: () => null,
  },
  Mutation: {
    // update values in the store on mutations
    setActiveNodeArray: (_, { value }, { cache }) => {
      cache.writeQuery({
        query: activeNodeArrayGql,
        data: { activeNodeArray: value },
      })
      const activeNodeArrayFromUrl = getActiveNodeArrayFromPathname()
      if (!isEqual(activeNodeArrayFromUrl, value)) {
        app.store.history.push(`/${value.join('/')}`)
      }
      return null
    },
    setTreeFilterText: (_, { value }, { cache }) => {
      cache.writeQuery({
        query: treeFilterTextGql,
        data: { treeFilterText: value },
      })
      return null
    },
    setTreeFilterId: (_, { value }, { cache }) => {
      cache.writeQuery({
        query: treeFilterIdGql,
        data: { treeFilterId: value },
      })
      return null
    },
  },
})
