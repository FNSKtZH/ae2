// @flow
import isEqual from 'lodash/isEqual'

export default (url: Object, activeNodeArray: Array<string>): boolean => {
  if (!url) return false
  if (!activeNodeArray) return false
  const activeNodeArrayPartWithEqualLength = activeNodeArray.slice(
    0,
    url.length
  )
  return isEqual(activeNodeArrayPartWithEqualLength, url)
}
