// @flow

import app from 'ampersand-app'

import exportTaxPropertiesGql from '../../components/Export/exportTaxPropertiesGql'
import exportPcoPropertiesGql from '../../components/Export/exportPcoPropertiesGql'
import exportPcoFiltersGql from '../../components/Export/exportPcoFiltersGql'
import exportRcoPropertiesGql from '../../components/Export/exportRcoPropertiesGql'
import exportTooManyPropertiesMutation from '../../components/Export/exportTooManyPropertiesMutation'
import constants from '../../modules/constants'

export default {
  Mutation: {
    addExportPcoProperty: (_, { pcname, pname }, { cache }) => {
      const currentPco = cache.readQuery({
        query: exportPcoPropertiesGql,
      })
      const currentRco = cache.readQuery({
        query: exportRcoPropertiesGql,
      })
      const currentTax = cache.readQuery({
        query: exportTaxPropertiesGql,
      })
      const nrOfPropertiesExported =
        currentTax.exportTaxProperties.length +
        currentRco.exportRcoProperties.length +
        currentPco.exportPcoProperties.length
      if (nrOfPropertiesExported > constants.export.maxFields) {
        app.client.mutate({
          mutation: exportTooManyPropertiesMutation,
          variables: {
            value: true,
          },
        })
      } else {
        // only add if not yet done
        if (
          !currentPco.exportPcoProperties.find(
            t => t.pcname === pcname && t.pname === pname
          )
        ) {
          cache.writeData({
            data: {
              exportPcoProperties: [
                ...currentPco.exportPcoProperties,
                {
                  pcname,
                  pname,
                  __typename: 'ExportPcoProperty',
                },
              ],
            },
          })
        }
      }
      return null
    },
    removeExportPcoProperty: (_, { pcname, pname }, { cache }) => {
      const current = cache.readQuery({
        query: exportPcoPropertiesGql,
      })
      const exportPcoProperties = current.exportPcoProperties.filter(
        x => !(x.pcname === pcname && x.pname === pname)
      )
      cache.writeData({
        data: {
          exportPcoProperties,
        },
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
        cache.writeData({
          data: {
            exportPcoFilters: exportPcoFilters.filter(
              x => !(x.pcname === pcname && x.pname === pname)
            ),
          },
        })
      } else if (!exportPcoFilter) {
        // add new one
        cache.writeData({
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
        cache.writeData({
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
    resetExportPcoProperties: (_, values, { cache }) => {
      cache.writeData({
        data: {
          exportPcoProperties: [],
        },
      })
      return null
    },
    resetExportPcoFilters: (_, values, { cache }) => {
      cache.writeData({
        data: {
          exportPcoFilters: [],
        },
      })
      return null
    },
  },
}
