// @flow
import { extendObservable, autorun } from 'mobx'

export default (store: Object): void => {
  extendObservable(store, {
    manipulateActiveNodeArray: autorun('manipulateActiveNodeArray', () => {
      // forward root to taxonomy
      if (store.tree.activeNodeArray.length === 0) {
        store.tree.activeNodeArray.push('taxonomy')
      }
    }),
  })
}
