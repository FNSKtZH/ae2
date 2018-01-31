// @flow

export default {
  Mutation: {
    setExportWithSynonymData: (_, { value }, { cache }) => {
      cache.writeData({ data: { 'exportWithSynonymData@client': value } })
      return null
    },
  },
}
