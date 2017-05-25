// @flow

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

export default (nodes: Array<Object>): Array<Object> =>
  nodes.sort(
    (a, b) =>
      compare(a.url[0], b.url[0]) ||
      compare(a.url[1], b.url[1]) ||
      compare(a.url[2], b.url[2]) ||
      compare(a.url[3], b.url[3]) ||
      compare(a.url[4], b.url[4]) ||
      compare(a.url[5], b.url[5]) ||
      compare(a.url[6], b.url[6]) ||
      compare(a.url[7], b.url[7]) ||
      compare(a.url[8], b.url[8]) ||
      compare(a.url[9], b.url[9]) ||
      compare(a.url[10], b.url[10])
  )
