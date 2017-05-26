// @flow
import extendStore from './extend'
import topLevelNodes from '../modules/nodes/topLevel'

function Store(): void {
  this.ui = {}
  this.nodes = {
    topLevel: topLevelNodes,
  }
}

const MyStore = new Store()

extendStore(MyStore)

export default MyStore
