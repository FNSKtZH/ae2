// @flow

import getActiveNodeArray from './getActiveNodeArray'
import getActiveObjectIdFromNodeArray from './getActiveObjectIdFromNodeArray'

export default (): string => {
  const activeNodeArray = getActiveNodeArray()
  return getActiveObjectIdFromNodeArray(activeNodeArray)
}
