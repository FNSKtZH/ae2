// @flow
import extendStore from './extend'
import ObservableHistory from './ObservableHistory'

function Store(): void {
  this.ui = {}
  this.nodes = []
  this.activeDataType = {}
  this.activeCategory = {}
  this.activeTaxonomy = {}
  this.activeLevel3 = {}
  this.activeLevel4 = {}
  this.activeLevel5 = {}
  this.activeLevel6 = {}
  this.history = ObservableHistory
  this.activeNodeArray = []
  this.setActiveNodeArray = () => {}
}

const MyStore = new Store()

extendStore(MyStore)

export default MyStore
