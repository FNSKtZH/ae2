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
    setActiveCategory: action('setActiveCategory', activeCategory => {
      store.activeCategory = activeCategory
    }),
    setActiveTaxonomy: action('setActiveTaxonomy', activeTaxonomy => {
      store.activeTaxonomy = activeTaxonomy
    }),
    setActiveLevel3: action('setActiveLevel3', activeLevel3 => {
      store.activeLevel3 = activeLevel3
    }),
    setActiveLevel4: action('setActiveLevel4', activeLevel4 => {
      store.activeLevel4 = activeLevel4
    }),
    setActiveLevel5: action('setActiveLevel5', activeLevel5 => {
      store.activeLevel5 = activeLevel5
    }),
    setActiveLevel6: action('setActiveLevel6', activeLevel6 => {
      store.activeLevel6 = activeLevel6
    }),
    activeNodeArray: [],
    setActiveNodeArray: action(
      'setActiveNodeArray',
      nodeArray => (store.activeNodeArray = nodeArray)
    ),
  })
}
