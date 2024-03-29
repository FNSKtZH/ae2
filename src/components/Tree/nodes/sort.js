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
const collator =
  typeof window !== 'undefined' ? new window.Intl.Collator('de-CH') : {}
const exists = (value) => !!value || value === 0
const compare = (a, b) => {
  // without this user without name is sorted above users node
  if (!exists(a) && !exists(b)) return 0
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

const sort = (nodes) =>
  nodes.sort(
    (a, b) =>
      compare(a.sort[0], b.sort[0]) ||
      compare(a.sort[1], b.sort[1]) ||
      compare(a.sort[2], b.sort[2]) ||
      compare(a.sort[3], b.sort[3]) ||
      compare(a.sort[4], b.sort[4]) ||
      compare(a.sort[5], b.sort[5]) ||
      compare(a.sort[6], b.sort[6]) ||
      compare(a.sort[7], b.sort[7]) ||
      compare(a.sort[8], b.sort[8]) ||
      compare(a.sort[9], b.sort[9]) ||
      compare(a.sort[10], b.sort[10]),
  )

export default sort
