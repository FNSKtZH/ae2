// @flow

export default {
  Mutation: {
    setExportIds: (_, { value }, { cache }) => {
      cache.writeData({ data: { 'exportIds@client': value } })
      return null
    },
  },
}
