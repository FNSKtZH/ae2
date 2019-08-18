import isEqual from 'lodash/isEqual'

export default (url, activeNodeArray) => {
  if (!url) return false
  if (!activeNodeArray) return false
  const activeNodeArrayPartWithEqualLength = activeNodeArray.slice(
    0,
    url.length,
  )
  return isEqual(activeNodeArrayPartWithEqualLength, url)
}
