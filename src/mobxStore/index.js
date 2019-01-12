import { types } from 'mobx-state-tree'

const myTypes = types
  .model({})
  .volatile(() => ({}))
  .views(self => ({}))
  .actions(self => ({}))

export default myTypes
