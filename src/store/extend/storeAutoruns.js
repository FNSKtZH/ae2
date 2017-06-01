// @flow
import { extendObservable, autorun, toJS } from 'mobx'
import isEqual from 'lodash/isEqual'

import getActiveNodeArrayFromPathname
  from '../action/getActiveNodeArrayFromPathname'

export default (store: Object): void => {
  extendObservable(store, {
    manipulateActiveNodeArray: autorun('manipulateActiveNodeArray', () => {
      const activeNodeArray = toJS(store.activeNodeArray)
      console.log(
        'manipulateActiveNodeArray, activeNodeArray:',
        activeNodeArray
      )
      // forward root to taxonomy
      if (activeNodeArray.length === 0) {
        return store.setActiveNodeArray(['taxonomy'])
      }
      const activeNodeArrayFromUrl = getActiveNodeArrayFromPathname()
      if (!isEqual(activeNodeArrayFromUrl, activeNodeArray)) {
        store.history.push(`/${activeNodeArray.join('/')}`)
      }
    }),
  })
}
