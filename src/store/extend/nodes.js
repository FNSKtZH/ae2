// @flow
import { extendObservable, action, computed } from 'mobx'

import sort from '../../modules/nodes/sort'

export default (store: Object): void => {
  extendObservable(store.nodes, {
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
      store.nodes.taxTaxonomyObjects = nodes
    }),
    nodes: computed(
      () =>
        sort([
          ...store.nodes.topLevel,
          ...store.nodes.taxCategories,
          ...store.nodes.taxTaxonomies,
          ...store.nodes.taxTaxonomyObjects,
        ]),
      { name: 'nodes' }
    ),
  })
}
