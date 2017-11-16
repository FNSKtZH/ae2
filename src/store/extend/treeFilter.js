// @flow
import { extendObservable, action } from 'mobx'

export default (store: Object): void => {
  extendObservable(store.treeFilter, {
    text: '',
    setText: action('setText', (text: string) => {
      store.treeFilter.text = text
    }),
  })
}
