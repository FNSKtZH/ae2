// @flow
import { toJS } from 'mobx'
/**
   * As all nodes are now in one flat list,
   * we need to sort them
   *
   * This is the sorting algorithm:
   *
   * compare the sort array value in the nodes
   * to determine sorting
   *
   * compare arrays element by element, starting with first
   * if a has no value at this index (> a is folder), sort a before b
   * if b has no value at this index (> b is folder), sort a after b
   * if a is smaller than b, sort a before b
   * if both array elements at this index are same,
   * compare values at next index
   */
const compare = (a, b) => {
  // sort a before, if it has no value at this index
  if (a !== 0 && !a) return -1
  // sort a after if b has no value at this index
  if (b !== 0 && !b) return 1
  // sort a before if its value is smaller
  return a - b
}

export default (nodes: Array<Object>): Array<Object> => {
  return nodes.sort((a, b) => {
    /*
     * need to convert to js
     * otherwise mobx declares out of bound warnings
     * because not existing array indexes are called
     */
    const aJS = toJS(a)
    const bJS = toJS(b)

    return (
      compare(aJS.url[0], bJS.url[0]) ||
      compare(aJS.url[1], bJS.url[1]) ||
      compare(aJS.url[2], bJS.url[2]) ||
      compare(aJS.url[3], bJS.url[3]) ||
      compare(aJS.url[4], bJS.url[4]) ||
      compare(aJS.url[5], bJS.url[5]) ||
      compare(aJS.url[6], bJS.url[6]) ||
      compare(aJS.url[7], bJS.url[7]) ||
      compare(aJS.url[8], bJS.url[8]) ||
      compare(aJS.url[9], bJS.url[9]) ||
      compare(aJS.url[10], bJS.url[10])
    )
  })
}
