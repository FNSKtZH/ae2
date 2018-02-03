// @flow

export default {
  Mutation: {
    setEditingPCs: (_, { value }, { cache }) => {
      cache.writeData({ data: { editingPCs: value } })
      return null
    },
  },
}
