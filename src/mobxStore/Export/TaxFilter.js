import { types } from 'mobx-state-tree'

export default types.model('TaxFilter', {
  taxname: types.optional(types.maybeNull(types.string), null),
  pname: types.optional(types.maybeNull(types.string), null),
  comparator: types.optional(types.maybeNull(types.string), null),
  value: types.optional(
    types.maybeNull(types.union(types.string, types.number)),
    null,
  ),
})

export const defaultValue = {
  taxname: null,
  pname: null,
  comparator: null,
  value: null,
}
