// @flow
import extendStore from './extend'

function Store(): void {
  this.export = {}
}

const MyStore = new Store()

extendStore(MyStore)

export default MyStore
