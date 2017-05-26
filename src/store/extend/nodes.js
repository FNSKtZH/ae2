// @flow
import { extendObservable } from 'mobx'

import topLevelNodes from '../modules/nodes/topLevel'

export default (store: Object): void => {
  extendObservable(store.nodes, {
    topLevel: topLevelNodes,
    taxCategories: [],
    taxTaxonomies: [],
    taxTaxonomyObjects: [],
  })
}
