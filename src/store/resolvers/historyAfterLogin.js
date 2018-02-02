// @flow

export default {
  Mutation: {
    setHistoryAfterLogin: (_, { value }, { cache }) => {
      cache.writeData({ data: { historyAfterLogin: value } })
      return null
    },
  },
}
