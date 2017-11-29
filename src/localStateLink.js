// @flow
import { withClientState } from 'apollo-link-state'
import app from 'ampersand-app'
import isEqual from 'lodash/isEqual'

import activeNodeArrayGql from './modules/activeNodeArrayGql'
import treeFilterGql from './modules/treeFilterGql'
import exportCategoriesGql from './modules/exportCategoriesGql'
import exportCombineTaxonomiesGql from './modules/exportCombineTaxonomiesGql'
import exportTaxonomiesGql from './modules/exportTaxonomiesGql'
import exportTaxPropertiesGql from './modules/exportTaxPropertiesGql'
import exportTaxFiltersGql from './modules/exportTaxFiltersGql'
import exportPcoPropertiesGql from './modules/exportPcoPropertiesGql'
import exportPcoFiltersGql from './modules/exportPcoFiltersGql'
import exportRcoPropertiesGql from './modules/exportRcoPropertiesGql'
import exportRcoFiltersGql from './modules/exportRcoFiltersGql'
import exportTooManyPropertiesGql from './modules/exportTooManyPropertiesGql'
import exportTooManyPropertiesMutation from './modules/exportTooManyPropertiesMutation'
import getActiveNodeArrayFromPathname from './modules/getActiveNodeArrayFromPathname'
import constants from './modules/constants'

export default withClientState({
  Query: {
    // provide initial state
    activeNodeArray: () => [],
    exportCategories: () => [],
    exportCombineTaxonomies: () => false,
    exportTaxonomies: () => [],
    exportTaxProperties: () => [],
    exportPcoProperties: () => [],
    exportRcoProperties: () => [],
    exportTaxFilters: () => [],
    exportPcoFilters: () => [],
    exportRcoFilters: () => [],
    exportTooManyProperties: () => false,
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
    /**
     * TODO
     * Weird thing: setActiveNodeArray rund before index.js!!??
     * probably on creating client
     */
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
    setExportTaxonomies: (_, { value }, { cache }) => {
      cache.writeQuery({
        query: exportTaxonomiesGql,
        data: { exportTaxonomies: value },
      })
      return null
    },
    addExportTaxProperty: (_, { taxName, pName }, { cache }) => {
      const currentTax = cache.readQuery({ query: exportTaxPropertiesGql })
      const currentRco = cache.readQuery({ query: exportRcoPropertiesGql })
      const currentPco = cache.readQuery({ query: exportPcoPropertiesGql })
      const nrOfPropertiesExported =
        currentTax.exportTaxProperties.length +
        currentRco.exportRcoProperties.length +
        currentPco.exportPcoProperties.length
      if (nrOfPropertiesExported > constants.export.maxFields) {
        app.client.mutate({
          mutation: exportTooManyPropertiesMutation,
          variables: { value: true },
        })
      } else {
        cache.writeQuery({
          query: exportTaxPropertiesGql,
          data: {
            exportTaxProperties: [
              ...currentTax.exportTaxProperties,
              { taxName, pName, __typename: 'ExportTaxProperty' },
            ],
          },
        })
      }
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
    setExportTaxFilters: (
      _,
      { taxName, pName, comparator, value },
      { cache }
    ) => {
      const { exportTaxFilters } = cache.readQuery({
        query: exportTaxFiltersGql,
      })
      const exportTaxFilter = exportTaxFilters.find(
        x => x.taxName === taxName && x.pName === pName
      )
      if (!comparator && !value && value !== 0) {
        // remove
        cache.writeQuery({
          query: exportTaxFiltersGql,
          data: {
            exportTaxFilters: exportTaxFilters.filter(
              x => !(x.taxName === taxName && x.pName === pName)
            ),
          },
        })
      } else if (!exportTaxFilter) {
        // add new one
        cache.writeQuery({
          query: exportTaxFiltersGql,
          data: {
            exportTaxFilters: [
              ...exportTaxFilters,
              {
                taxName,
                pName,
                comparator,
                value,
                __typename: 'ExportTaxFilter',
              },
            ],
          },
        })
      } else {
        // edit = add new one instead of existing
        cache.writeQuery({
          query: exportTaxFiltersGql,
          data: {
            exportTaxFilters: [
              ...exportTaxFilters.filter(
                x => !(x.taxName === taxName && x.pName === pName)
              ),
              {
                taxName,
                pName,
                comparator,
                value,
                __typename: 'ExportTaxFilter',
              },
            ],
          },
        })
      }
      return null
    },
    addExportPcoProperty: (_, { pCName, pName }, { cache }) => {
      const currentPco = cache.readQuery({ query: exportPcoPropertiesGql })
      const currentRco = cache.readQuery({ query: exportRcoPropertiesGql })
      const currentTax = cache.readQuery({ query: exportTaxPropertiesGql })
      const nrOfPropertiesExported =
        currentTax.exportTaxProperties.length +
        currentRco.exportRcoProperties.length +
        currentPco.exportPcoProperties.length
      if (nrOfPropertiesExported > constants.export.maxFields) {
        app.client.mutate({
          mutation: exportTooManyPropertiesMutation,
          variables: { value: true },
        })
      } else {
        cache.writeQuery({
          query: exportPcoPropertiesGql,
          data: {
            exportPcoProperties: [
              ...currentPco.exportPcoProperties,
              { pCName, pName, __typename: 'ExportPcoProperty' },
            ],
          },
        })
      }
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
    setExportPcoFilters: (
      _,
      { pCName, pName, comparator, value },
      { cache }
    ) => {
      const { exportPcoFilters } = cache.readQuery({
        query: exportPcoFiltersGql,
      })
      const exportPcoFilter = exportPcoFilters.find(
        x => x.pCName === pCName && x.pName === pName
      )
      if (!comparator && !value && value !== 0) {
        // remove
        cache.writeQuery({
          query: exportPcoFiltersGql,
          data: {
            exportPcoFilters: exportPcoFilters.filter(
              x => !(x.pCName === pCName && x.pName === pName)
            ),
          },
        })
      } else if (!exportPcoFilter) {
        // add new one
        cache.writeQuery({
          query: exportPcoFiltersGql,
          data: {
            exportPcoFilters: [
              ...exportPcoFilters,
              {
                pCName,
                pName,
                comparator,
                value,
                __typename: 'ExportPcoFilter',
              },
            ],
          },
        })
      } else {
        // edit = add new one instead of existing
        cache.writeQuery({
          query: exportPcoFiltersGql,
          data: {
            exportPcoFilters: [
              ...exportPcoFilters.filter(
                x => !(x.pCName === pCName && x.pName === pName)
              ),
              {
                pCName,
                pName,
                comparator,
                value,
                __typename: 'ExportPcoFilter',
              },
            ],
          },
        })
      }
      return null
    },
    addExportRcoProperty: (_, { pCName, pName }, { cache }) => {
      const currentRco = cache.readQuery({ query: exportRcoPropertiesGql })
      const currentPco = cache.readQuery({ query: exportPcoPropertiesGql })
      const currentTax = cache.readQuery({ query: exportTaxPropertiesGql })
      const nrOfPropertiesExported =
        currentTax.exportTaxProperties.length +
        currentRco.exportRcoProperties.length +
        currentPco.exportPcoProperties.length
      if (nrOfPropertiesExported > constants.export.maxFields) {
        app.client.mutate({
          mutation: exportTooManyPropertiesMutation,
          variables: { value: true },
        })
      } else {
        cache.writeQuery({
          query: exportRcoPropertiesGql,
          data: {
            exportRcoProperties: [
              ...currentRco.exportRcoProperties,
              { pCName, pName, __typename: 'ExportRcoProperty' },
            ],
          },
        })
      }
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
    setExportRcoFilters: (
      _,
      { pCName, pName, comparator, value },
      { cache }
    ) => {
      const { exportRcoFilters } = cache.readQuery({
        query: exportRcoFiltersGql,
      })
      const exportRcoFilter = exportRcoFilters.find(
        x => x.pCName === pCName && x.pName === pName
      )
      if (!comparator && !value && value !== 0) {
        // remove
        cache.writeQuery({
          query: exportRcoFiltersGql,
          data: {
            exportRcoFilters: exportRcoFilters.filter(
              x => !(x.pCName === pCName && x.pName === pName)
            ),
          },
        })
      } else if (!exportRcoFilter) {
        // add new one
        cache.writeQuery({
          query: exportRcoFiltersGql,
          data: {
            exportRcoFilters: [
              ...exportRcoFilters,
              {
                pCName,
                pName,
                comparator,
                value,
                __typename: 'ExportRcoFilter',
              },
            ],
          },
        })
      } else {
        // edit = add new one instead of existing
        cache.writeQuery({
          query: exportRcoFiltersGql,
          data: {
            exportRcoFilters: [
              ...exportRcoFilters.filter(
                x => !(x.pCName === pCName && x.pName === pName)
              ),
              {
                pCName,
                pName,
                comparator,
                value,
                __typename: 'ExportRcoFilter',
              },
            ],
          },
        })
      }
      return null
    },
    setExportTooManyProperties: (_, { value }, { cache }) => {
      cache.writeQuery({
        query: exportTooManyPropertiesGql,
        data: { exportTooManyProperties: value },
      })
      return null
    },
  },
})
