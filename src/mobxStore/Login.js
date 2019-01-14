import { types } from 'mobx-state-tree'

export default types
  .model('TreeFilter', {
    token: types.optional(types.maybeNull(types.string), null),
    username: types.optional(types.maybeNull(types.string), null),
  })
  .actions(self => ({
    setLogin({ username, token }) {
      self.username = username
      self.token = token
    },
  }))

export const defaultValue = {
  token: null,
  username: null,
}
