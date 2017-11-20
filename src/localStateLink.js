// @flow
import { withClientState } from 'apollo-link-state'
import app from 'ampersand-app'
import isEqual from 'lodash/isEqual'

import activeNodeArrayGql from './modules/activeNodeArrayGql'
import treeFilterTextGql from './modules/treeFilterTextGql'
import treeFilterIdGql from './modules/treeFilterIdGql'
import exportCategoriesGql from './modules/exportCategoriesGql'
import exportCombineTaxonomiesGql from './modules/exportCombineTaxonomiesGql'
import exportPcoPropertiesGql from './modules/exportPcoPropertiesGql'
import getActiveNodeArrayFromPathname from './modules/getActiveNodeArrayFromPathname'

export default withClientState({
  Query: {
    // provide initial state
    activeNodeArray: () => [],
    treeFilterText: () => '',
    treeFilterId: () => null,
    exportCategories: () => [],
    exportCombineTaxonomies: () => false,
    exportPcoProperties: () => [],
    // this is experimental
    // see: https://github.com/apollographql/apollo-link-state/issues/111
    treeFilter: () => ({
      text: () => '',
      id: () => null,
    }),
  },
  Mutation: {
    // update values in the store on mutations
    setActiveNodeArray: (_, { value }, { cache }) => {
      cache.writeQuery({
        query: activeNodeArrayGql,
        data: { activeNodeArray: value },
      })
      const activeNodeArrayFromUrl = getActiveNodeArrayFromPathname()
      if (!isEqual(activeNodeArrayFromUrl, value)) {
        app.history.push(`/${value.join('/')}`)
      }
      return null
    },
    setTreeFilterText: (_, { value }, { cache }) => {
      cache.writeQuery({
        query: treeFilterTextGql,
        data: { treeFilterText: value },
      })
      return null
    },
    setTreeFilterId: (_, { value }, { cache }) => {
      cache.writeQuery({
        query: treeFilterIdGql,
        data: { treeFilterId: value },
      })
      return null
    },
    setExportCategories: (_, { value }, { cache }) => {
      cache.writeQuery({
        query: exportCategoriesGql,
        data: { exportCategories: value },
      })
      return null
    },
    setExportCombineTaxonomies: (_, { value }, { cache }) => {
      cache.writeQuery({
        query: exportCombineTaxonomiesGql,
        data: { exportCombineTaxonomies: value },
      })
      return null
    },
    setExportPcoProperties: (_, { value }, { cache }) => {
      cache.writeQuery({
        query: exportPcoPropertiesGql,
        data: { exportPcoProperties: value },
      })
      return null
    },
  },
})
