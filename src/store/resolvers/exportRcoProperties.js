// @flow

import app from 'ampersand-app'

import exportTaxPropertiesGql from '../../components/Export/exportTaxPropertiesGql'
import exportPcoPropertiesGql from '../../components/Export/exportPcoPropertiesGql'
import exportRcoPropertiesGql from '../../components/Export/exportRcoPropertiesGql'
import exportRcoFiltersGql from '../../components/Export/exportRcoFiltersGql'
import exportTooManyPropertiesMutation from '../../components/Export/exportTooManyPropertiesMutation'
import constants from '../../modules/constants'

export default {
  Mutation: {
    addExportRcoProperty: (_, { pcname, relationType, pname }, { cache }) => {
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
        // only add if not yet done
        if (
          !currentRco.exportRcoProperties.find(
            t =>
              t.pcname === pcname &&
              t.relationType === relationType &&
              t.pname === pname
          )
        ) {
          cache.writeData({
            data: {
              exportRcoProperties: [
                ...currentRco.exportRcoProperties,
                {
                  pcname,
                  relationType,
                  pname,
                  __typename: 'ExportRcoProperty',
                },
              ],
            },
          })
        }
      }
      return null
    },
    removeExportRcoProperty: (
      _,
      { pcname, relationType, pname },
      { cache }
    ) => {
      console.log('removeExportRcoProperty: relationType:', relationType)
      const current = cache.readQuery({ query: exportRcoPropertiesGql })
      console.log(
        'removeExportRcoProperty: current.exportRcoProperties:',
        current.exportRcoProperties
      )
      const exportRcoProperties = current.exportRcoProperties.filter(
        x =>
          !(
            x.pcname === pcname &&
            x.relationType === relationType &&
            x.pname === pname
          )
      )
      console.log(
        'removeExportRcoProperty: exportRcoProperties:',
        exportRcoProperties
      )
      cache.writeData({
        data: { exportRcoProperties },
      })
      return null
    },
    setExportRcoFilters: (
      _,
      { pcname, relationType, pname, comparator, value },
      { cache }
    ) => {
      const { exportRcoFilters } = cache.readQuery({
        query: exportRcoFiltersGql,
      })
      const exportRcoFilter = exportRcoFilters.find(
        x =>
          x.pcname === pcname &&
          x.relationType === relationType &&
          x.pname === pname
      )
      if (!comparator && !value && value !== 0) {
        // remove
        cache.writeData({
          data: {
            exportRcoFilters: exportRcoFilters.filter(
              x =>
                !(
                  x.pcname === pcname &&
                  x.relationType === relationType &&
                  x.pname === pname
                )
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
                relationType,
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
                x =>
                  !(
                    x.pcname === pcname &&
                    x.relationType === relationType &&
                    x.pname === pname
                  )
              ),
              {
                pcname,
                relationType,
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
    resetExportRcoProperties: (_, values, { cache }) => {
      cache.writeData({
        data: {
          exportRcoProperties: [],
        },
      })
      return null
    },
    resetExportRcoFilters: (_, values, { cache }) => {
      cache.writeData({
        data: {
          exportRcoFilters: [],
        },
      })
      return null
    },
  },
}
