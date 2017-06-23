// @flow
import { extendObservable, action } from 'mobx'

export default (store: Object): void => {
  extendObservable(store, {
    activeNodeArray: [],
    setActiveNodeArray: action(
      'setActiveNodeArray',
      nodeArray => (store.activeNodeArray = nodeArray)
    ),
    nodes: [],
    setNodes: action('setNodes', nodes => {
      store.nodes = nodes
    }),
    activeTreeLevel: null,
    activeTaxonomyObject: null,
    setActiveTaxonomyObject: action(
      'setActiveTaxonomyObject',
      to => (store.activeTaxonomyObject = to)
    ),
    urlFromTOId: null,
    setUrlFromTOId: action('setUrlFromTOId', id => (store.urlFromTOId = id)),
    urlFromPCId: null,
    setUrlFromPCId: action('setUrlFromPCId', id => (store.urlFromPCId = id)),
    urlFromRCId: null,
    setUrlFromRCId: action('setUrlFromRCId', id => (store.urlFromRCId = id)),
    categories: [],
    setCategories: action(
      'setCategories',
      categories => (store.categories = categories)
    ),
  })
}
