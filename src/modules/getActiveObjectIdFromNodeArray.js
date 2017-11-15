// @flow
export default (activeNodeArray: Array<string>): string => {
  if (activeNodeArray.length > 2 && activeNodeArray[0] === 'Taxonomien') {
    return activeNodeArray[activeNodeArray.length - 1]
  }
  // seems to have to return value or query will bark
  return '99999999-9999-9999-9999-999999999999'
}
