// @flow
import { withClientState } from 'apollo-link-state'
import app from 'ampersand-app'
import isEqual from 'lodash/isEqual'

import activeNodeArrayGql from './modules/activeNodeArrayGql'
import activeObjectIdGql from './modules/activeObjectIdGql'
import getActiveNodeArrayFromPathname from './store/action/getActiveNodeArrayFromPathname'

export default withClientState({
  Query: {
    // provide initial state
    activeNodeArray: () => [
      {
        value: [],
        __typename: 'ActiveNodeArray',
      },
    ],
    activeObjectId: () => [
      {
        value: null,
        __typename: 'ActiveObjectId',
      },
    ],
  },
  Mutation: {
    // update values in the store on mutations
    setActiveNodeArray: (_, { value }, { cache }) => {
      const data = {
        activeNodeArray: [
          {
            value,
            __typename: 'ActiveNodeArray',
          },
        ],
      }
      cache.writeQuery({ query: activeNodeArrayGql, data })
      const activeNodeArrayFromUrl = getActiveNodeArrayFromPathname()
      if (!isEqual(activeNodeArrayFromUrl, value)) {
        app.store.history.push(`/${value.join('/')}`)
      }
      app.store.activeTreeLevel = value.length
      return null
    },
    setActiveObjectId: (_, { value }, { cache }) => {
      const data = {
        activeObjectId: [
          {
            value,
            __typename: 'ActiveObjectId',
          },
        ],
      }
      cache.writeQuery({ query: activeObjectIdGql, data })
      return null
    },
  },
})
