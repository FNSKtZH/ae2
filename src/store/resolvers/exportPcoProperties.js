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
