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
  })
}
