// @flow

import getActiveNodeArray from './getActiveNodeArray'

export default (): string => {
  const activeNodeArray = getActiveNodeArray()
  if (activeNodeArray.length > 2 && activeNodeArray[0] === 'Taxonomien') {
    return activeNodeArray[activeNodeArray.length - 1]
  }
  return '99999999-9999-9999-9999-999999999999'
}
