// @flow
import extendStore from './extend'
import ObservableHistory from './ObservableHistory'

function Store(): void {
  this.ui = {}
  this.nodes = []
  this.activeDataType = {}
  this.history = ObservableHistory
  this.activeNodeArray = []
  this.setActiveNodeArray = () => {}
}

const MyStore = new Store()

extendStore(MyStore)

export default MyStore
