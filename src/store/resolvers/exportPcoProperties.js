// @flow
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
        cache.writeData({
          data: {
            exportTooManyProperties: true,
          },
        })
      } else {
        // only add if not yet done
        if (
          !currentPco.exportPcoProperties.find(
            t => t.pcname === pcname && t.pname === pname,
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
        x => !(x.pcname === pcname && x.pname === pname),
      )
      cache.writeData({
        data: {
          exportPcoProperties,
        },
      })
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
  },
}
