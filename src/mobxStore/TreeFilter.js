import { types } from 'mobx-state-tree'

export default types
  .model('TreeFilter', {
    text: types.optional(types.maybeNull(types.string), ''),
    id: types.optional(types.maybeNull(types.string), null),
  })
  .actions(self => ({
    setTreeFilter({ id, text }) {
      self.text = text
      self.id = id
    },
  }))

export const defaultValue = {
  text: '',
  id: null,
}
