// @flow
import extendStore from './extend'

function Store(): void {
  this.ui = {}
  this.nodes = {}
}

const MyStore = new Store()

extendStore(MyStore)

export default MyStore
