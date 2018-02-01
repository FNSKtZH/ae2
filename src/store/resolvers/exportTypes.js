// @flow

export default {
  Mutation: {
    setExportTypes: (_, { value }, { cache }) => {
      cache.writeData({ data: { 'exportTypes@client': value } })
      return null
    },
  },
}
