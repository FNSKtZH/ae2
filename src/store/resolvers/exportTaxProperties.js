// @flow

import app from 'ampersand-app'

import exportTaxPropertiesGql from '../../components/Export/exportTaxPropertiesGql'
import exportTaxFiltersGql from '../../components/Export/exportTaxFiltersGql'
import exportPcoPropertiesGql from '../../components/Export/exportPcoPropertiesGql'
import exportRcoPropertiesGql from '../../components/Export/exportRcoPropertiesGql'
import exportTooManyPropertiesMutation from '../../components/Export/exportTooManyPropertiesMutation'
import constants from '../../modules/constants'

export default {
  Mutation: {
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
        // only add if not yet done
        if (
          !currentTax.exportTaxProperties.find(
            t => t.taxname === taxname && t.pname === pname
          )
        ) {
          cache.writeData({
            data: {
              exportTaxProperties: [
                ...currentTax.exportTaxProperties,
                { taxname, pname, __typename: 'ExportTaxProperty' },
              ],
            },
          })
        }
      }
      return null
    },
    removeExportTaxProperty: (_, { taxname, pname }, { cache }) => {
      const current = cache.readQuery({ query: exportTaxPropertiesGql })
      const exportTaxProperties = current.exportTaxProperties.filter(
        x => !(x.taxname === taxname && x.pname === pname)
      )
      cache.writeData({
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
        cache.writeData({
          data: {
            exportTaxFilters: exportTaxFilters.filter(
              x => !(x.taxname === taxname && x.pname === pname)
            ),
          },
        })
      } else if (!exportTaxFilter) {
        // add new one
        cache.writeData({
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
        cache.writeData({
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
    resetExportTaxProperties: (_, values, { cache }) => {
      cache.writeData({
        data: {
          exportTaxProperties: [],
        },
      })
      return null
    },
    resetExportTaxFilters: (_, values, { cache }) => {
      cache.writeData({
        data: {
          exportTaxFilters: [],
        },
      })
      return null
    },
  },
}
