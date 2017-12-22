// @flow

export default {
  Mutation: {
    setTreeFilter: (_, { id, text }, { cache }) => {
      const treeFilter = { id, text, __typename: 'TreeFilter' }
      cache.writeData({ data: { treeFilter } })
      return null
    },
  },
}
