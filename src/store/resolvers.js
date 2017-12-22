// @flow

import app from 'ampersand-app'
import isEqual from 'lodash/isEqual'

//import activeNodeArrayGql from '../modules/activeNodeArrayGql'
import treeFilterGql from '../modules/treeFilterGql'
import loginGql from '../modules/loginGql'
import exportCategoriesGql from '../modules/exportCategoriesGql'
import exportTaxonomiesGql from '../modules/exportTaxonomiesGql'
import exportTaxPropertiesGql from '../modules/exportTaxPropertiesGql'
import exportTaxFiltersGql from '../modules/exportTaxFiltersGql'
import exportPcoPropertiesGql from '../modules/exportPcoPropertiesGql'
import exportPcoFiltersGql from '../modules/exportPcoFiltersGql'
import exportRcoPropertiesGql from '../modules/exportRcoPropertiesGql'
import exportRcoFiltersGql from '../modules/exportRcoFiltersGql'
import exportTooManyPropertiesGql from '../modules/exportTooManyPropertiesGql'
import exportTooManyPropertiesMutation from '../modules/exportTooManyPropertiesMutation'
import exportWithSynonymDataGql from '../modules/exportWithSynonymDataGql'
import historyAfterLoginGql from '../modules/historyAfterLoginGql'
import getActiveNodeArrayFromPathname from '../modules/getActiveNodeArrayFromPathname'
import constants from '../modules/constants'

export default () => ({
  Mutation: {
    // update values in the store on mutations
    setActiveNodeArray: (_, { value }, { cache }) => {
      /*cache.writeQuery({
        query: activeNodeArrayGql,
        data: { activeNodeArray: value },
      })*/
      cache.writeData({ data: { activeNodeArray: value } })
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
    setLogin: (_, { token, role, username }, { cache }) => {
      const login = { token, role, username, __typename: 'Login' }
      cache.writeQuery({
        query: loginGql,
        data: { login },
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
    setExportTaxonomies: (_, { value }, { cache }) => {
      cache.writeQuery({
        query: exportTaxonomiesGql,
        data: { exportTaxonomies: value },
      })
      return null
    },
    addExportTaxProperty: (_, { taxname, pname }, { cache }) => {
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
              { taxname, pname, __typename: 'ExportTaxProperty' },
            ],
          },
        })
      }
      return null
    },
    removeExportTaxProperty: (_, { taxname, pname }, { cache }) => {
      const current = cache.readQuery({ query: exportTaxPropertiesGql })
      const exportTaxProperties = current.exportTaxProperties.filter(
        x => !(x.taxname === taxname && x.pname === pname)
      )
      cache.writeQuery({
        query: exportTaxPropertiesGql,
        data: { exportTaxProperties },
      })
      return null
    },
    setExportTaxFilters: (
      _,
      { taxname, pname, comparator, value },
      { cache }
    ) => {
      const { exportTaxFilters } = cache.readQuery({
        query: exportTaxFiltersGql,
      })
      const exportTaxFilter = exportTaxFilters.find(
        x => x.taxname === taxname && x.pname === pname
      )
      if (!comparator && !value && value !== 0) {
        // remove
        cache.writeQuery({
          query: exportTaxFiltersGql,
          data: {
            exportTaxFilters: exportTaxFilters.filter(
              x => !(x.taxname === taxname && x.pname === pname)
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
                taxname,
                pname,
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
                x => !(x.taxname === taxname && x.pname === pname)
              ),
              {
                taxname,
                pname,
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
    addExportPcoProperty: (_, { pcname, pname }, { cache }) => {
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
              { pcname, pname, __typename: 'ExportPcoProperty' },
            ],
          },
        })
      }
      return null
    },
    removeExportPcoProperty: (_, { pcname, pname }, { cache }) => {
      const current = cache.readQuery({ query: exportPcoPropertiesGql })
      const exportPcoProperties = current.exportPcoProperties.filter(
        x => !(x.pcname === pcname && x.pname === pname)
      )
      cache.writeQuery({
        query: exportPcoPropertiesGql,
        data: { exportPcoProperties },
      })
      return null
    },
    setExportPcoFilters: (
      _,
      { pcname, pname, comparator, value },
      { cache }
    ) => {
      const { exportPcoFilters } = cache.readQuery({
        query: exportPcoFiltersGql,
      })
      const exportPcoFilter = exportPcoFilters.find(
        x => x.pcname === pcname && x.pname === pname
      )
      if (!comparator && !value && value !== 0) {
        // remove
        cache.writeQuery({
          query: exportPcoFiltersGql,
          data: {
            exportPcoFilters: exportPcoFilters.filter(
              x => !(x.pcname === pcname && x.pname === pname)
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
                pcname,
                pname,
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
                x => !(x.pcname === pcname && x.pname === pname)
              ),
              {
                pcname,
                pname,
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
    addExportRcoProperty: (_, { pcname, pname }, { cache }) => {
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
              { pcname, pname, __typename: 'ExportRcoProperty' },
            ],
          },
        })
      }
      return null
    },
    removeExportRcoProperty: (_, { pcname, pname }, { cache }) => {
      const current = cache.readQuery({ query: exportRcoPropertiesGql })
      const exportRcoProperties = current.exportRcoProperties.filter(
        x => !(x.pcname === pcname && x.pname === pname)
      )
      cache.writeQuery({
        query: exportRcoPropertiesGql,
        data: { exportRcoProperties },
      })
      return null
    },
    setExportRcoFilters: (
      _,
      { pcname, pname, comparator, value },
      { cache }
    ) => {
      const { exportRcoFilters } = cache.readQuery({
        query: exportRcoFiltersGql,
      })
      const exportRcoFilter = exportRcoFilters.find(
        x => x.pcname === pcname && x.pname === pname
      )
      if (!comparator && !value && value !== 0) {
        // remove
        cache.writeQuery({
          query: exportRcoFiltersGql,
          data: {
            exportRcoFilters: exportRcoFilters.filter(
              x => !(x.pcname === pcname && x.pname === pname)
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
                pcname,
                pname,
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
                x => !(x.pcname === pcname && x.pname === pname)
              ),
              {
                pcname,
                pname,
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
    setExportWithSynonymData: (_, { value }, { cache }) => {
      cache.writeQuery({
        query: exportWithSynonymDataGql,
        data: { exportWithSynonymData: value },
      })
      return null
    },
    setHistoryAfterLogin: (_, { value }, { cache }) => {
      cache.writeQuery({
        query: historyAfterLoginGql,
        data: { historyAfterLogin: value },
      })
      return null
    },
  },
})
