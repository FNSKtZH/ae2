// @flow

export default {
  Mutation: {
    setExportRcoInOneRow: (_, { value }, { cache }) => {
      cache.writeData({ data: { exportRcoInOneRow: value } })
      return null
    },
  },
}
