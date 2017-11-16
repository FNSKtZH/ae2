// @flow
import { withClientState } from 'apollo-link-state'
import app from 'ampersand-app'
import isEqual from 'lodash/isEqual'

import activeNodeArrayGql from './modules/activeNodeArrayGql'
import activeObjectIdGql from './modules/activeObjectIdGql'
import getActiveNodeArrayFromPathname from './modules/getActiveNodeArrayFromPathname'

export default withClientState({
  Query: {
    // provide initial state
    activeNodeArray: () => [],
    /**
     * not in use
     * but kept as template for possible others
     */
    activeObjectId: () => null,
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
    setActiveObjectId: (_, { value }, { cache }) => {
      cache.writeQuery({
        query: activeObjectIdGql,
        data: { activeObjectId: value },
      })
      return value
    },
  },
})
