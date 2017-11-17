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
  })
}
