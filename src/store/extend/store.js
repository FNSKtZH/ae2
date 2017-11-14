// @flow
import { extendObservable, action } from 'mobx'

export default (store: Object): void => {
  extendObservable(store, {
    props: {},
    setProps: action('setProps', props => (store.props = props)),
    nodes: [],
    setNodes: action('setNodes', nodes => {
      store.nodes = nodes
    }),
    activeTreeLevel: null,
    activeObject: null,
    setActiveObject: action('setActiveObject', to => (store.activeObject = to)),
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
