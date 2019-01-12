import { types } from 'mobx-state-tree'

export default types.model('PcoFilter', {
  pcname: types.optional(types.maybeNull(types.string), null),
  pname: types.optional(types.maybeNull(types.string), null),
  comparator: types.optional(types.maybeNull(types.string), null),
  value: types.optional(
    types.maybeNull(types.union(types.string, types.number)),
    null,
  ),
})

export const defaultValue = {
  pcname: null,
  pname: null,
  comparator: null,
  value: null,
}
