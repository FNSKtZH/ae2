// @flow
import { extendObservable, action } from 'mobx'

export default (store: Object): void => {
  extendObservable(store, {
    nodes: [],
    setNodes: action('setNodes', nodes => {
      store.nodes = nodes
    }),
    setActiveDataType: action('setActiveDataType', activeDataType => {
      store.activeDataType = activeDataType
    }),
    activeNodeArray: [],
    setActiveNodeArray: action(
      'setActiveNodeArray',
      nodeArray => (store.activeNodeArray = nodeArray)
    ),
  })
}
