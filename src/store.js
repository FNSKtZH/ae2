// @flow
/**
 * this is probably not functional any more
 * but only saved for inspiration for work on export store
 * in apollo
 */
import { action } from 'mobx'

function Store(): void {
  this.export = {
    pcoProperties: [],
    setPcoProperties: action(
      'setPcoProperties',
      pcoProperties => (this.export.pcoProperties = pcoProperties)
    ),
  }
}

const MyStore = new Store()

export default MyStore
