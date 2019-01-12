import { types } from 'mobx-state-tree'

export default types.model('TreeFilter', {
  text: types.optional(types.maybeNull(types.string), null),
  id: types.optional(types.maybeNull(types.string), null),
})

export const defaultValue = {
  text: null,
  id: null,
}
