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
    const aSort = toJS(a.sort)
    const bSort = toJS(b.sort)

    return (
      compare(aSort[0], bSort[0]) ||
      compare(aSort[1], bSort[1]) ||
      compare(aSort[2], bSort[2]) ||
      compare(aSort[3], bSort[3]) ||
      compare(aSort[4], bSort[4]) ||
      compare(aSort[5], bSort[5]) ||
      compare(aSort[6], bSort[6]) ||
      compare(aSort[7], bSort[7]) ||
      compare(aSort[8], bSort[8]) ||
      compare(aSort[9], bSort[9]) ||
      compare(aSort[10], bSort[10])
    )
  })
}
