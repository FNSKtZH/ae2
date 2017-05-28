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
const collator = new window.Intl.Collator('de-CH')
const compare = (a, b) => {
  // sort a before, if it has no value at this index
  if (a !== 0 && !a) return -1
  // sort a after if b has no value at this index
  if (b !== 0 && !b) return 1
  // sort a before if its value is smaller
  if (isNaN(a) && isNaN(b)) {
    return collator.compare(a, b)
  }
  return a - b
}

export default (nodes: Array<Object>): Array<Object> => {
  return nodes.sort((a, b) => {
    /*
     * need to convert to js
     * otherwise mobx declares out of bound warnings
     * because not existing array indexes are called
     * TODO:
     * this may be speed critical
     * try not to have to use toJS
     */
    const aUrl = toJS(a.url)
    const bUrl = toJS(b.url)

    return (
      compare(aUrl[0], bUrl[0]) ||
      compare(aUrl[1], bUrl[1]) ||
      compare(aUrl[2], bUrl[2]) ||
      compare(aUrl[3], bUrl[3]) ||
      compare(aUrl[4], bUrl[4]) ||
      compare(aUrl[5], bUrl[5]) ||
      compare(aUrl[6], bUrl[6]) ||
      compare(aUrl[7], bUrl[7]) ||
      compare(aUrl[8], bUrl[8]) ||
      compare(aUrl[9], bUrl[9]) ||
      compare(aUrl[10], bUrl[10])
    )
  })
}
