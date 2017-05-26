// @flow
import { extendObservable, action, computed } from 'mobx'

import topLevelNodes from '../../modules/nodes/topLevel'
import sort from '../../modules/nodes/sort'

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
    nodes: computed(
      () =>
        sort([
          ...store.nodes.topLevel,
          ...store.nodes.taxCategories,
          ...store.nodes.taxTaxonomies,
          ...store.nodes.taxTaxonomyObjects,
        ]),
      { name: 'nodes' },
    ),
  })
}
