// @flow
import uniq from 'lodash/uniq'
import gql from 'graphql-tag'

import constants from '../../modules/constants'

const exportTaxPropertiesGql = gql`
  query exportTaxPropertiesQuery {
    exportTaxProperties @client {
      taxname
      pname
    }
  }
`
const exportPcoPropertiesGql = gql`
  query exportPcoPropertiesQuery {
    exportPcoProperties @client {
      pcname
      pname
    }
  }
`
const exportRcoPropertiesGql = gql`
  query exportRcoPropertiesQuery {
    exportRcoProperties @client {
      pcname
      relationtype
      pname
    }
  }
`
const exportRcoFiltersGql = gql`
  query exportRcoFiltersQuery {
    exportRcoFilters @client {
      pcname
      pname
      relationtype
      comparator
      value
    }
  }
`
const exportRcoInOneRowGql = gql`
  query exportRcoInOneRowQuery {
    exportRcoInOneRow @client
  }
`

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
        cache.writeData({
          data: {
            exportTooManyProperties: true,
          },
        })
      } else {
        // only add if not yet done
        if (
          !currentRco.exportRcoProperties.find(
            t =>
              t.pcname === pcname &&
              t.relationtype === relationtype &&
              t.pname === pname,
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
            exportRcoProperties.map(e => `${e.pcname}/${e.relationtype}`),
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
      { cache },
    ) => {
      const current = cache.readQuery({ query: exportRcoPropertiesGql })
      const exportRcoProperties = current.exportRcoProperties.filter(
        x =>
          !(
            x.pcname === pcname &&
            x.relationtype === relationtype &&
            x.pname === pname
          ),
      )
      cache.writeData({
        data: { exportRcoProperties },
      })
      return null
    },
  },
}
