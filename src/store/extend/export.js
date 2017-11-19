// @flow
import { extendObservable, action } from 'mobx'

export default (store: Object): void => {
  extendObservable(store.export, {
    pcoProperties: [],
    setPcoProperties: action(
      'setPcoProperties',
      pcoProperties => (store.export.pcoProperties = pcoProperties)
    ),
  })
}
