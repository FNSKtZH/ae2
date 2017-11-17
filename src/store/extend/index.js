// @flow
import extendStore from './store'
import extendExport from './export'
import extendStoreAutoruns from './storeAutoruns'

export default (store: Object): void => {
  extendStore(store)
  extendExport(store)
  extendStoreAutoruns(store)
}
