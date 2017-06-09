// @flow
import extendStore from './extend'
import ObservableHistory from './ObservableHistory'

function Store(): void {
  this.ui = {}
  this.tree = {
    nodes: [],
    setNodes: () => {},
    activeDataType: {},
    setActiveDataType: () => {},
    activeCategory: {},
    setActiveCategory: () => {},
    activeTaxonomy: {},
    setActiveTaxonomy: () => {},
    activeLevel3: {},
    setActiveLevel3: () => {},
    activeLevel4: {},
    setActiveLevel4: () => {},
    activeLevel5: {},
    setActiveLevel5: () => {},
    activeLevel6: {},
    setActiveLevel6: () => {},
    activeLevel7: {},
    setActiveLevel7: () => {},
    activeLevel8: {},
    setActiveLevel8: () => {},
    activeLevel9: {},
    setActiveLevel9: () => {},
    activeLevel10: {},
    setActiveLevel10: () => {},
  }
  this.history = ObservableHistory
  this.activeNodeArray = []
  this.setActiveNodeArray = () => {}
}

const MyStore = new Store()

extendStore(MyStore)

export default MyStore
