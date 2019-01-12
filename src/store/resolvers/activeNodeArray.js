// @flow
import isEqual from 'lodash/isEqual'

import getActiveNodeArrayFromPathname from '../../modules/getActiveNodeArrayFromPathname'

export default history => ({
  Mutation: {
    // update values in the store on mutations
    setActiveNodeArray: (_, { value }, { cache }) => {
      cache.writeData({ data: { activeNodeArray: value } })
      const activeNodeArrayFromUrl = getActiveNodeArrayFromPathname()
      if (!isEqual(activeNodeArrayFromUrl, value)) {
        history.push(`/${value.join('/')}`)
      }
      return null
    },
  },
})
