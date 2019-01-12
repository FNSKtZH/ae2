import { types } from 'mobx-state-tree'

export default types.model('TaxProperty', {
  taxname: types.optional(types.maybeNull(types.string), null),
  pname: types.optional(types.maybeNull(types.string), null),
})

export const defaultValue = {
  taxname: null,
  pname: null,
}
