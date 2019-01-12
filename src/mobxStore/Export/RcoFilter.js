import { types } from 'mobx-state-tree'

export default types.model('RcoFilter', {
  pcname: types.optional(types.maybeNull(types.string), null),
  pname: types.optional(types.maybeNull(types.string), null),
  relationtype: types.optional(types.maybeNull(types.string), null),
  comparator: types.optional(types.maybeNull(types.string), null),
  value: types.optional(
    types.maybeNull(types.union(types.string, types.number)),
    null,
  ),
})

export const defaultValue = {
  pcname: null,
  pname: null,
  relationtype: null,
  comparator: null,
  value: null,
}
