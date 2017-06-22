// @flow
import extendTreeFilter from './treeFilter'
import extendStore from './store'
import extendStoreAutoruns from './storeAutoruns'

export default (store: Object): void => {
  extendTreeFilter(store)
  extendStore(store)
  extendStoreAutoruns(store)
}
