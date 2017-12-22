// @flow

export default {
  Mutation: {
    setExportCategories: (_, { value }, { cache }) => {
      cache.writeData({ data: { exportCategories: value } })
      return null
    },
  },
}
