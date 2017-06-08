// @flow
import extendStore from './extend'
import ObservableHistory from './ObservableHistory'

function Store(): void {
  this.ui = {}
  this.tree = {
    nodes: [],
    setNodes: () => {},
    activeDataType: {},
    activeCategory: {},
    activeTaxonomy: {},
    activeLevel3: {},
    activeLevel4: {},
    activeLevel5: {},
    activeLevel6: {},
    activeLevel7: {},
    activeLevel8: {},
    activeLevel9: {},
    activeLevel10: {},
  }
  this.history = ObservableHistory
  this.activeNodeArray = []
  this.setActiveNodeArray = () => {}
}

const MyStore = new Store()

extendStore(MyStore)

export default MyStore
