// @flow
import extendUi from './ui'
import extendStore from './store'
import extendStoreAutoruns from './storeAutoruns'

export default (store: Object): void => {
  extendUi(store)
  extendStore(store)
  extendStoreAutoruns(store)
}
