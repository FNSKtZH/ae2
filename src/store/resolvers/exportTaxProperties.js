// @flow
import gql from 'graphql-tag'

const exportTaxFiltersGql = gql`
  query exportTaxFiltersQuery {
    exportTaxFilters @client {
      taxname
      pname
      comparator
      value
    }
  }
`

export default {
  Mutation: {
    setExportTaxFilters: (
      _,
      { taxname, pname, comparator, value },
      { cache },
    ) => {
      const { exportTaxFilters } = cache.readQuery({
        query: exportTaxFiltersGql,
      })
      const exportTaxFilter = exportTaxFilters.find(
        x => x.taxname === taxname && x.pname === pname,
      )
      if (!comparator && !value && value !== 0) {
        // remove
        cache.writeData({
          data: {
            exportTaxFilters: exportTaxFilters.filter(
              x => !(x.taxname === taxname && x.pname === pname),
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
                x => !(x.taxname === taxname && x.pname === pname),
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
