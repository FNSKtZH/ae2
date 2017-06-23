// @flow
import extendTreeFilter from './treeFilter'
import extendStore from './store'
import extendExport from './export'
import extendStoreAutoruns from './storeAutoruns'

export default (store: Object): void => {
  extendTreeFilter(store)
  extendStore(store)
  extendExport(store)
  extendStoreAutoruns(store)
}
