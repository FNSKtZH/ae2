// @flow
import extendStore from './extend'
import ObservableHistory from './ObservableHistory'

function Store(): void {
  this.ui = {}
  this.tree = {
    nodes: [],
    setNodes: () => {},
    activeLevel1: {},
    setActiveLevel1: () => {},
    activeLevel2Taxonomy: {},
    setActiveLevel2Taxonomy: () => {},
    activeLevel3Taxonomy: {},
    setActiveLevel3Taxonomy: () => {},
    activeLevel4Taxonomy: {},
    setActiveLevel4Taxonomy: () => {},
    activeLevel5Taxonomy: {},
    setActiveLevel5Taxonomy: () => {},
    activeLevel6Taxonomy: {},
    setActiveLevel6Taxonomy: () => {},
    activeLevel7Taxonomy: {},
    setActiveLevel7Taxonomy: () => {},
    activeLevel8Taxonomy: {},
    setActiveLevel8Taxonomy: () => {},
    activeLevel9Taxonomy: {},
    setActiveLevel9Taxonomy: () => {},
    activeLevel10Taxonomy: {},
    setActiveLevel10Taxonomy: () => {},
  }
  this.history = ObservableHistory
  this.activeNodeArray = []
  this.setActiveNodeArray = () => {}
}

const MyStore = new Store()

extendStore(MyStore)

export default MyStore
