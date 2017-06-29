// @flow
import { extendObservable, action } from 'mobx'

export default (store: Object): void => {
  extendObservable(store, {
    props: {},
    setProps: action('setProps', props => (store.props = props)),
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
    categories: [],
    setCategories: action(
      'setCategories',
      categories => (store.categories = categories)
    ),
  })
}
