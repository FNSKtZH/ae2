// @flow
import { extendObservable, action } from 'mobx'

export default (store: Object): void => {
  extendObservable(store.tree, {
    nodes: [],
    setNodes: action('setNodes', nodes => {
      store.tree.nodes = nodes
    }),
    activeLevel: null,
    activeLevel1: {},
    setActiveLevel1: action('setActiveLevel1', activeLevel1 => {
      store.tree.activeLevel1 = activeLevel1
    }),
    activeLevel2Taxonomy: {},
    setActiveLevel2Taxonomy: action('setActiveLevel2Taxonomy', activeLevel2Taxonomy => {
      store.tree.activeLevel2Taxonomy = activeLevel2Taxonomy
    }),
    activeLevel3Taxonomy: {},
    setActiveLevel3Taxonomy: action('setActiveLevel3Taxonomy', activeLevel3Taxonomy => {
      store.tree.activeLevel3Taxonomy = activeLevel3Taxonomy
    }),
    activeLevel4Taxonomy: {},
    setActiveLevel4Taxonomy: action('setActiveLevel4Taxonomy', activeLevel4Taxonomy => {
      store.tree.activeLevel4Taxonomy = activeLevel4Taxonomy
    }),
    activeLevel5Taxonomy: {},
    setActiveLevel5Taxonomy: action('setActiveLevel5Taxonomy', activeLevel5Taxonomy => {
      store.tree.activeLevel5Taxonomy = activeLevel5Taxonomy
    }),
    activeLevel6Taxonomy: {},
    setActiveLevel6Taxonomy: action('setActiveLevel6Taxonomy', activeLevel6Taxonomy => {
      store.tree.activeLevel6Taxonomy = activeLevel6Taxonomy
    }),
    activeLevel7Taxonomy: {},
    setActiveLevel7Taxonomy: action('setActiveLevel7Taxonomy', activeLevel7Taxonomy => {
      store.tree.activeLevel7Taxonomy = activeLevel7Taxonomy
    }),
    activeLevel8Taxonomy: {},
    setActiveLevel8Taxonomy: action('setActiveLevel8Taxonomy', activeLevel8Taxonomy => {
      store.tree.activeLevel8Taxonomy = activeLevel8Taxonomy
    }),
    activeLevel9Taxonomy: {},
    setActiveLevel9Taxonomy: action('setActiveLevel9Taxonomy', activeLevel9Taxonomy => {
      store.tree.activeLevel9Taxonomy = activeLevel9Taxonomy
    }),
    activeLevel10Taxonomy: {},
    setActiveLevel10Taxonomy: action('setActiveLevel10Taxonomy', activeLevel10Taxonomy => {
      store.tree.activeLevel10Taxonomy = activeLevel10Taxonomy
    }),
  })
}
