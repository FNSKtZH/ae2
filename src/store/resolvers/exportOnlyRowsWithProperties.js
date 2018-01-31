// @flow

export default {
  Mutation: {
    setExportOnlyRowsWithProperties: (_, { value }, { cache }) => {
      cache.writeData({
        data: { 'exportOnlyRowsWithProperties@client': value },
      })
      return null
    },
  },
}
