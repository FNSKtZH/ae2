// @flow
import { extendObservable, action } from 'mobx'

export default (store: Object): void => {
  extendObservable(store.export, {
    categories: [],
    setCategories: action(
      'setCategories',
      categories => (store.export.categories = categories)
    ),
  })
}
