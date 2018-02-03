// @flow

export default {
  Mutation: {
    setExportAddFilterFields: (_, { value }, { cache }) => {
      cache.writeData({ data: { exportAddFilterFields: value } })
      return null
    },
  },
}
