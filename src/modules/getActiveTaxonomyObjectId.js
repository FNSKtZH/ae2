// @flow

export default (store: Object): string => {
  if (
    store.activeNodeArray.length > 2 &&
    store.activeNodeArray[0] === 'Taxonomien'
  ) {
    return store.activeNodeArray[store.activeNodeArray.length - 1]
  }
  return '99999999-9999-9999-9999-999999999999'
}
