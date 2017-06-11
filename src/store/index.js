// @flow
import extendStore from './extend'
import ObservableHistory from './ObservableHistory'

function Store(): void {
  this.ui = {}
  this.nodes = []
  this.setNodes = () => {}
  this.history = ObservableHistory
  this.activeNodeArray = []
  this.setActiveNodeArray = () => {}
  this.activeTreeLevel = null
}

const MyStore = new Store()

extendStore(MyStore)

export default MyStore
