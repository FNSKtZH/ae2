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
    taxTaxonomyObjectsLevel1: [],
    setTaxTaxonomyObjectsNodesLevel1: action(
      'setTaxTaxonomyObjectsNodesLevel1',
      nodes => {
        store.nodes.taxTaxonomyObjectsLevel1 = nodes
      }
    ),
    taxTaxonomyObjectsLevel2: [],
    setTaxTaxonomyObjectsNodesLevel2: action(
      'setTaxTaxonomyObjectsNodesLevel2',
      nodes => {
        store.nodes.taxTaxonomyObjectsLevel2 = nodes
      }
    ),
    nodes: computed(
      () =>
        sort([
          ...store.nodes.topLevel,
          ...store.nodes.taxCategories,
          ...store.nodes.taxTaxonomies,
          ...store.nodes.taxTaxonomyObjectsLevel1,
          ...store.nodes.taxTaxonomyObjectsLevel2,
        ]),
      { name: 'nodes' }
    ),
  })
}
