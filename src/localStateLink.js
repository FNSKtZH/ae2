// @flow
import { withClientState } from 'apollo-link-state'
import app from 'ampersand-app'
import isEqual from 'lodash/isEqual'

import activeNodeArrayGql from './modules/activeNodeArrayGql'
import treeFilterTextGql from './modules/treeFilterTextGql'
import getActiveNodeArrayFromPathname from './modules/getActiveNodeArrayFromPathname'

export default withClientState({
  Query: {
    // provide initial state
    activeNodeArray: () => [],
    treeFilterText: () => null,
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
      return value
    },
    setTreeFilterText: (_, { value }, { cache }) => {
      cache.writeQuery({
        query: treeFilterTextGql,
        data: { treeFilterText: value },
      })
      return value
    },
  },
})
