// @flow

export default {
  Mutation: {
    setExportTaxonomies: (_, { value }, { cache }) => {
      cache.writeData({ data: { exportTaxonomies: value } })
      return null
    },
  },
}
