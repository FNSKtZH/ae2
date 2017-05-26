// @flow
import { extendObservable, action } from 'mobx'

import topLevelNodes from '../modules/nodes/topLevel'

export default (store: Object): void => {
  extendObservable(store.nodes, {
    topLevel: topLevelNodes,
    taxCategories: [],
    setTaxCategoriesNodes: action('setTaxCategoriesNodes', nodes => {
      store.nodes.taxCategories = nodes
    }),
    taxTaxonomies: [],
    setTaxTaxonomiesNodes: action('setTaxTaxonomiesNodes', nodes => {
      store.nodes.taxTaxonomies = nodes
    }),
    taxTaxonomyObjects: [],
    setTaxTaxonomyObjectsNodes: action('setTaxTaxonomyObjectsNodes', nodes => {
      store.nodes.TaxonomyObjects = nodes
    }),
  })
}
