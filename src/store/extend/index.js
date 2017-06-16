// @flow
import extendUi from './ui'
import extendTreeFilter from './treeFilter'
import extendStore from './store'
import extendStoreAutoruns from './storeAutoruns'

export default (store: Object): void => {
  extendUi(store)
  extendTreeFilter(store)
  extendStore(store)
  extendStoreAutoruns(store)
}
