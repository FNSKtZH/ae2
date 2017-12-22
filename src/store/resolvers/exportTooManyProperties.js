// @flow

export default {
  Mutation: {
    setExportTooManyProperties: (_, { value }, { cache }) => {
      cache.writeData({ data: { exportTooManyProperties: value } })
      return null
    },
  },
}
