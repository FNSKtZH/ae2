import { types } from 'mobx-state-tree'
import isEqual from 'lodash/isEqual'

import Export, { defaultValue as defaultExport } from './Export'
import TreeFilter, { defaultValue as defaultTreeFilter } from './TreeFilter'
import Login, { defaultValue as defaultLogin } from './Login'
import getActiveNodeArrayFromPathname from '../modules/getActiveNodeArrayFromPathname'

const mobxStore = ({ navigate }) =>
  types
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
      sidebarWidth: types.maybeNull(types.number, null),
      docFilter: types.optional(types.union(types.string, types.number), ''),
      homeWidth: types.optional(types.number, 800),
      windowWidth: types.optional(types.number, 800),
      windowHeight: types.optional(types.number, 800),
    })
    .actions((self) => ({
      setWindowHeight(val) {
        self.windowHeight = val
      },
      setWindowWidth(val) {
        self.windowWidth = val
      },
      setHomeWidth(val) {
        self.homeWidth = val
      },
      setSidebarWidth(val) {
        self.sidebarWidth = val
      },
      setDocFilter(val) {
        self.docFilter = val
      },
      setEditingTaxonomies(value) {
        self.editingTaxonomies = value
      },
      setEditingPCs(value) {
        self.editingPCs = value
      },
      setUpdateAvailable(value) {
        self.updateAvailable = value
      },
      setActiveNodeArray(value) {
        self.activeNodeArray = value
        const activeNodeArrayFromUrl = getActiveNodeArrayFromPathname()
        if (!isEqual(activeNodeArrayFromUrl, value)) {
          navigate(`/${value.join('/')}`)
        }
      },
      setHistoryAfterLogin(value) {
        self.historyAfterLogin = value
      },
    }))

export default mobxStore
