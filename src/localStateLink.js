// @flow
import { withClientState } from 'apollo-link-state'
import app from 'ampersand-app'
import isEqual from 'lodash/isEqual'

import activeNodeArrayGql from './modules/activeNodeArrayGql'
import treeFilterGql from './modules/treeFilterGql'
import exportCategoriesGql from './modules/exportCategoriesGql'
import exportCombineTaxonomiesGql from './modules/exportCombineTaxonomiesGql'
import exportTaxPropertiesGql from './modules/exportTaxPropertiesGql'
import exportPcoPropertiesGql from './modules/exportPcoPropertiesGql'
import exportRcoPropertiesGql from './modules/exportRcoPropertiesGql'
import getActiveNodeArrayFromPathname from './modules/getActiveNodeArrayFromPathname'

export default withClientState({
  Query: {
    // provide initial state
    activeNodeArray: () => [],
    exportCategories: () => [],
    exportCombineTaxonomies: () => false,
    exportTaxProperties: () => [],
    exportPcoProperties: () => [],
    exportRcoProperties: () => [],
    // this is experimental
    // see: https://github.com/apollographql/apollo-link-state/issues/111
    treeFilter: () => ({
      text: '',
      id: null,
      __typename: 'TreeFilter',
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
    setTreeFilter: (_, { id, text }, { cache }) => {
      const treeFilter = { id, text, __typename: 'TreeFilter' }
      cache.writeQuery({
        query: treeFilterGql,
        data: { treeFilter },
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
    addExportTaxProperty: (_, { taxName, pName }, { cache }) => {
      const current = cache.readQuery({ query: exportTaxPropertiesGql })
      cache.writeQuery({
        query: exportTaxPropertiesGql,
        data: {
          exportTaxProperties: [
            ...current.exportTaxProperties,
            { taxName, pName, __typename: 'ExportTaxProperty' },
          ],
        },
      })
      return null
    },
    removeExportTaxProperty: (_, { taxName, pName }, { cache }) => {
      const current = cache.readQuery({ query: exportTaxPropertiesGql })
      const exportTaxProperties = current.exportTaxProperties.filter(
        x => !(x.taxName === taxName && x.pName === pName)
      )
      cache.writeQuery({
        query: exportTaxPropertiesGql,
        data: { exportTaxProperties },
      })
      return null
    },
    addExportPcoProperty: (_, { pCName, pName }, { cache }) => {
      const current = cache.readQuery({ query: exportPcoPropertiesGql })
      cache.writeQuery({
        query: exportPcoPropertiesGql,
        data: {
          exportPcoProperties: [
            ...current.exportPcoProperties,
            { pCName, pName, __typename: 'ExportPcoProperty' },
          ],
        },
      })
      return null
    },
    removeExportPcoProperty: (_, { pCName, pName }, { cache }) => {
      const current = cache.readQuery({ query: exportPcoPropertiesGql })
      const exportPcoProperties = current.exportPcoProperties.filter(
        x => !(x.pCName === pCName && x.pName === pName)
      )
      cache.writeQuery({
        query: exportPcoPropertiesGql,
        data: { exportPcoProperties },
      })
      return null
    },
    addExportRcoProperty: (_, { pCName, pName }, { cache }) => {
      const current = cache.readQuery({ query: exportRcoPropertiesGql })
      cache.writeQuery({
        query: exportRcoPropertiesGql,
        data: {
          exportRcoProperties: [
            ...current.exportRcoProperties,
            { pCName, pName, __typename: 'ExportRcoProperty' },
          ],
        },
      })
      return null
    },
    removeExportRcoProperty: (_, { pCName, pName }, { cache }) => {
      const current = cache.readQuery({ query: exportRcoPropertiesGql })
      const exportRcoProperties = current.exportRcoProperties.filter(
        x => !(x.pCName === pCName && x.pName === pName)
      )
      cache.writeQuery({
        query: exportRcoPropertiesGql,
        data: { exportRcoProperties },
      })
      return null
    },
  },
})
