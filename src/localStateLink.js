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
    activeNodeArray: () => [],
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
