// @flow
import extendStore from './extend'
import ObservableHistory from './ObservableHistory'

function Store(): void {
  this.history = ObservableHistory
  this.export = {}
}

const MyStore = new Store()

extendStore(MyStore)

export default MyStore
