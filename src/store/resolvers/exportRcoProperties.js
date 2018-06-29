// @flow

import app from 'ampersand-app'
import uniq from 'lodash/uniq'

import exportTaxPropertiesGql from '../../components/Export/exportTaxPropertiesGql'
import exportPcoPropertiesGql from '../../components/Export/exportPcoPropertiesGql'
import exportRcoPropertiesGql from '../../components/Export/exportRcoPropertiesGql'
import exportRcoInOneRowGql from '../../components/Export/exportRcoInOneRowGql'
import exportRcoFiltersGql from '../../components/Export/exportRcoFiltersGql'
import exportTooManyPropertiesMutation from '../../components/Export/exportTooManyPropertiesMutation'
import constants from '../../modules/constants'

export default {
  Mutation: {
    addExportRcoProperty: (_, { pcname, relationtype, pname }, { cache }) => {
      const currentRco = cache.readQuery({ query: exportRcoPropertiesGql })
      const currentPco = cache.readQuery({ query: exportPcoPropertiesGql })
      const currentTax = cache.readQuery({ query: exportTaxPropertiesGql })
      const { exportRcoInOneRow } = cache.readQuery({
        query: exportRcoInOneRowGql,
      })
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
              t.relationtype === relationtype &&
              t.pname === pname
          )
        ) {
          const exportRcoProperties = [
            ...currentRco.exportRcoProperties,
            {
              pcname,
              relationtype,
              pname,
              __typename: 'ExportRcoProperty',
            },
          ]
          cache.writeData({
            data: {
              exportRcoProperties,
            },
          })
          // set exportRcoInOneRow if more than one type of rco is choosen
          const rcoPCTypes = uniq(
            exportRcoProperties.map(e => `${e.pcname}/${e.relationtype}`)
          )
          if (rcoPCTypes.length > 1 && !exportRcoInOneRow) {
            cache.writeData({ data: { exportRcoInOneRow: true } })
          }
        }
      }
      return null
    },
    removeExportRcoProperty: (
      _,
      { pcname, relationtype, pname },
      { cache }
    ) => {
      const current = cache.readQuery({ query: exportRcoPropertiesGql })
      const exportRcoProperties = current.exportRcoProperties.filter(
        x =>
          !(
            x.pcname === pcname &&
            x.relationtype === relationtype &&
            x.pname === pname
          )
      )
      cache.writeData({
        data: { exportRcoProperties },
      })
      return null
    },
    setExportRcoFilters: (
      _,
      { pcname, relationtype, pname, comparator, value },
      { cache }
    ) => {
      const { exportRcoFilters } = cache.readQuery({
        query: exportRcoFiltersGql,
      })
      const exportRcoFilter = exportRcoFilters.find(
        x =>
          x.pcname === pcname &&
          x.relationtype === relationtype &&
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
                  x.relationtype === relationtype &&
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
                relationtype,
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
                    x.relationtype === relationtype &&
                    x.pname === pname
                  )
              ),
              {
                pcname,
                relationtype,
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
