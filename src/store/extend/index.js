// @flow
import extendUi from './ui'
import extendTree from './tree'
import extendStore from './store'
import extendStoreAutoruns from './storeAutoruns'

export default (store: Object): void => {
  extendUi(store)
  extendTree(store)
  extendStore(store)
  extendStoreAutoruns(store)
}
