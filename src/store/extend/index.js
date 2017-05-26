import extendUi from './ui'
import extendNodes from './nodes'

export default (store: Object): void => {
  extendUi(store)
  extendNodes(store)
}
