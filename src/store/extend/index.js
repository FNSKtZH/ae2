// @flow
import extendStore from './store'
import extendExport from './export'

export default (store: Object): void => {
  extendStore(store)
  extendExport(store)
}
