// @flow
import { extendObservable, action } from 'mobx'

export default (store: Object): void => {
  extendObservable(store.ui, {
    visibleColumns: {
      tree: true,
      main: true,
    },
    toggleColumnVisibility: action('toggleColumnVisibility', column => {
      store.ui.visibleColumns[column] = !store.ui.visibleColumns[column]
    }),
  })
}
