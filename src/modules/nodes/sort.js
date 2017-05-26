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
      compare(aJS.sort[0], bJS.sort[0]) ||
      compare(aJS.sort[1], bJS.sort[1]) ||
      compare(aJS.sort[2], bJS.sort[2]) ||
      compare(aJS.sort[3], bJS.sort[3]) ||
      compare(aJS.sort[4], bJS.sort[4]) ||
      compare(aJS.sort[5], bJS.sort[5]) ||
      compare(aJS.sort[6], bJS.sort[6]) ||
      compare(aJS.sort[7], bJS.sort[7]) ||
      compare(aJS.sort[8], bJS.sort[8]) ||
      compare(aJS.sort[9], bJS.sort[9]) ||
      compare(aJS.sort[10], bJS.sort[10])
    )
  })
}
