// @flow

export default {
  Mutation: {
    setExportTaxonomies: (_, { value }, { cache }) => {
      cache.writeData({ data: { 'exportTaxonomies@client': value } })
      return null
    },
  },
}
