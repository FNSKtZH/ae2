// @flow

export default {
  Mutation: {
    setExportCategories: (_, { value }, { cache }) => {
      cache.writeData({ data: { 'exportCategories@client': value } })
      return null
    },
  },
}
