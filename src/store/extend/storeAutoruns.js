// @flow
import { extendObservable, reaction } from 'mobx'
import get from 'lodash/get'

export default (store: Object): void => {
  extendObservable(store, {
    onChangePcoPropertiesByCategories: reaction(
      () => get(store.props, 'pcoPropertiesByCategoriesFunction.nodes', []),
      (pcoProperties: Array<Object>) =>
        store.export.setPcoProperties(pcoProperties)
    ),
  })
}
