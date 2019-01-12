import { types } from 'mobx-state-tree'

export default types.model('RcoProperty', {
  pcname: types.optional(types.maybeNull(types.string), null),
  relationtype: types.optional(types.maybeNull(types.string), null),
  pname: types.optional(types.maybeNull(types.string), null),
})

export const defaultValue = {
  pcname: null,
  relationtype: null,
  pname: null,
}
