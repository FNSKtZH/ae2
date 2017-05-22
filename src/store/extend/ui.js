// @flow
import { extendObservable, action } from 'mobx'

export default (store: Object): void => {
  extendObservable(store.ui, {
    visibleColumns: {
      tree: true,
      main: true,
    },
    setColumnVisibility: action('setColumnVisibility', (column, value) => {
      store.ui.visibleColumns[column] = value
    }),
  })
}
