// @flow

export default {
  Mutation: {
    setExportWithSynonymData: (_, { value }, { cache }) => {
      cache.writeData({ data: { exportWithSynonymData: value } })
      return null
    },
  },
}
