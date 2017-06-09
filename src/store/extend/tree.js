// @flow
import { extendObservable, action } from 'mobx'

export default (store: Object): void => {
  extendObservable(store.tree, {
    nodes: [],
    setNodes: action('setNodes', nodes => {
      store.tree.nodes = nodes
    }),
    activeLevel: null,
    activeDataType: {},
    setActiveDataType: action('setActiveDataType', activeDataType => {
      store.tree.activeDataType = activeDataType
    }),
    activeCategory: {},
    setActiveCategory: action('setActiveCategory', activeCategory => {
      store.tree.activeCategory = activeCategory
    }),
    activeTaxonomy: {},
    setActiveTaxonomy: action('setActiveTaxonomy', activeTaxonomy => {
      store.tree.activeTaxonomy = activeTaxonomy
    }),
    activeLevel4: {},
    setActiveLevel4: action('setActiveLevel4', activeLevel4 => {
      store.tree.activeLevel4 = activeLevel4
    }),
    activeLevel5: {},
    setActiveLevel5: action('setActiveLevel5', activeLevel5 => {
      store.tree.activeLevel5 = activeLevel5
    }),
    activeLevel6: {},
    setActiveLevel6: action('setActiveLevel6', activeLevel6 => {
      store.tree.activeLevel6 = activeLevel6
    }),
    activeLevel7: {},
    setActiveLevel7: action('setActiveLevel7', activeLevel7 => {
      store.tree.activeLevel7 = activeLevel7
    }),
    activeLevel8: {},
    setActiveLevel8: action('setActiveLevel8', activeLevel8 => {
      store.tree.activeLevel8 = activeLevel8
    }),
    activeLevel9: {},
    setActiveLevel9: action('setActiveLevel9', activeLevel9 => {
      store.tree.activeLevel9 = activeLevel9
    }),
    activeLevel10: {},
    setActiveLevel10: action('setActiveLevel10', activeLevel10 => {
      store.tree.activeLevel10 = activeLevel10
    }),
  })
}
