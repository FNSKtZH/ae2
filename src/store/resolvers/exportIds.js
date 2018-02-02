// @flow

export default {
  Mutation: {
    setExportIds: (_, { value }, { cache }) => {
      cache.writeData({ data: { exportIds: value } })
      return null
    },
  },
}
