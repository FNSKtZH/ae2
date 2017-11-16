// @flow
export default (activeNodeArray: Array<string>): ?string => {
  let activeObjectId = null
  if (activeNodeArray.length > 2 && activeNodeArray[0] === 'Taxonomien') {
    activeObjectId = activeNodeArray[activeNodeArray.length - 1]
  }
  return activeObjectId
}
