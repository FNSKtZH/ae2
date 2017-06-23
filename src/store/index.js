// @flow
import extendStore from './extend'
import ObservableHistory from './ObservableHistory'

function Store(): void {
  this.nodes = []
  this.setNodes = () => {}
  this.history = ObservableHistory
  this.activeNodeArray = []
  this.setActiveNodeArray = () => {}
  this.activeTreeLevel = null
  this.activeTaxonomyObject = null
  this.setActiveTaxonomyObject = () => {}
  this.treeFilter = {}
  this.export = {
    categories: [],
    setCategories: () => {},
  }
  this.categories = []
}

const MyStore = new Store()

extendStore(MyStore)

export default MyStore
