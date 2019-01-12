import { types } from 'mobx-state-tree'

import Export, { defaultValue as defaultExport } from './Export'

const myTypes = types
  .model({
    export: types.optional(Export, defaultExport),
    editingTaxonomies: types.optional(types.boolean, false),
    editingPCs: types.optional(types.boolean, false),
    updateAvailable: types.optional(types.boolean, false),
    activeNodeArray: types.optional(
      types.array(types.union(types.string, types.number)),
      [],
    ),
  })
  .volatile(() => ({}))
  .views(self => ({}))
  .actions(self => ({}))

export default myTypes
