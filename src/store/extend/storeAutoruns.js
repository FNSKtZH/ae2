// @flow
import { extendObservable, autorun } from 'mobx'

export default (store: Object): void => {
  extendObservable(store, {
    manipulateActiveNodeArray: autorun('manipulateActiveNodeArray', () => {
      // forward root to taxonomy
      if (store.activeNodeArray.length === 0) {
        store.activeNodeArray.push('taxonomy')
      }
    }),
  })
}
