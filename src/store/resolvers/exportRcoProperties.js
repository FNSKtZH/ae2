// @flow

import app from 'ampersand-app'

import exportTaxPropertiesGql from '../../modules/exportTaxPropertiesGql'
import exportPcoPropertiesGql from '../../modules/exportPcoPropertiesGql'
import exportRcoPropertiesGql from '../../modules/exportRcoPropertiesGql'
import exportRcoFiltersGql from '../../modules/exportRcoFiltersGql'
import exportTooManyPropertiesMutation from '../../modules/exportTooManyPropertiesMutation'
import constants from '../../modules/constants'

export default {
  Mutation: {
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
        cache.writeData({
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
      cache.writeData({ data: { exportRcoProperties } })
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
        cache.writeData({
          data: {
            exportRcoFilters: exportRcoFilters.filter(
              x => !(x.pcname === pcname && x.pname === pname)
            ),
          },
        })
      } else if (!exportRcoFilter) {
        // add new one
        cache.writeData({
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
        cache.writeData({
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
  },
}
