import extendUi from './ui'
import extendNodes from './nodes'
import extendStore from './store'
import extendStoreAutoruns from './storeAutoruns'

export default (store: Object): void => {
  extendUi(store)
  extendNodes(store)
  extendStore(store)
  extendStoreAutoruns(store)
}
