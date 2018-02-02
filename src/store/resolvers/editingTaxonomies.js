// @flow

export default {
  Mutation: {
    setEditingTaxonomies: (_, { value }, { cache }) => {
      cache.writeData({ data: { editingTaxonomies: value } })
      return null
    },
  },
}
