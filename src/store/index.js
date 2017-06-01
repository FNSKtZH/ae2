// @flow
import extendStore from './extend'
import topLevelNodes from '../modules/nodes/topLevel'
import ObservableHistory from './ObservableHistory'

function Store(): void {
  this.ui = {}
  this.nodes = {
    topLevel: topLevelNodes,
  }
  this.history = ObservableHistory
  this.activeNodeArray = []
  this.setActiveNodeArray = () => {}
}

const MyStore = new Store()

extendStore(MyStore)

export default MyStore
