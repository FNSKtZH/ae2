// @flow

export default {
  Mutation: {
    setExportType: (_, { value }, { cache }) => {
      cache.writeData({ data: { exportType: value } })
      return null
    },
  },
}
