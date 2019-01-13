import { types } from 'mobx-state-tree'

import Export, { defaultValue as defaultExport } from './Export'
import TreeFilter, { defaultValue as defaultTreeFilter } from './TreeFilter'
import Login, { defaultValue as defaultLogin } from './Login'

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
    treeFilter: types.optional(TreeFilter, defaultTreeFilter),
    login: types.optional(Login, defaultLogin),
    historyAfterLogin: types.optional(types.string, ''),
  })
  .volatile(() => ({}))
  .views(self => ({}))
  .actions(self => ({}))

export default myTypes
