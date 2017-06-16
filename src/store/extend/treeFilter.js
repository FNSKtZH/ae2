// @flow
import { extendObservable, action } from 'mobx'

export default (store: Object): void => {
  extendObservable(store.treeFilter, {
    text: null,
    setTreeFilterText: action('setTreeFilterText', (text: string) => {
      store.treeFilter.text = text
    }),
    id: null,
    setTreeFilterId: action('setTreeFilterId', (id: string) => {
      store.treeFilter.id = id
    }),
    type: null,
    setTreeFilterType: action('setTreeFilterType', (type: string) => {
      store.treeFilter.type = type
    }),
  })
}
