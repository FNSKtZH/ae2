import { types } from 'mobx-state-tree'

import Export, { defaultValue as defaultExport } from './Export'

const myTypes = types
  .model({
    export: types.optional(Export, defaultExport),
  })
  .volatile(() => ({}))
  .views(self => ({}))
  .actions(self => ({}))

export default myTypes
