import { types } from 'mobx-state-tree'

export default types.model('TreeFilter', {
  token: types.optional(types.maybeNull(types.string), null),
  username: types.optional(types.maybeNull(types.string), null),
})

export const defaultValue = {
  token: null,
  username: null,
}
