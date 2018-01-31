// @flow

export default {
  Mutation: {
    setEditingTaxonomies: (_, { value }, { cache }) => {
      cache.writeData({ data: { 'editingTaxonomies@client': value } })
      return null
    },
  },
}
