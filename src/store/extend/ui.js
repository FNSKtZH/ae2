// @flow
import { extendObservable, action } from 'mobx'

export default (store: Object): void => {
  extendObservable(store.ui, {
    visibleColumns: {
      tree: true,
      data: true,
      export: false,
    },
    toggleColumnVisibility: action('toggleColumnVisibility', column => {
      store.ui.visibleColumns[column] = !store.ui.visibleColumns[column]
    }),
  })
}
