// @flow
import { extendObservable, action } from 'mobx'

export default (store: Object): void => {
  extendObservable(store.export, {
    categories: [],
    setCategories: action(
      'setCategories',
      categories => (store.export.categories = categories)
    ),
    combineTaxonomies: false,
    setCombineTaxonomies: action(
      'setCombineTaxonomies',
      combineTaxonomies => (store.export.combineTaxonomies = combineTaxonomies)
    ),
  })
}
