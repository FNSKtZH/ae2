// @flow

export default {
  Mutation: {
    setHistoryAfterLogin: (_, { value }, { cache }) => {
      cache.writeData({ data: { 'historyAfterLogin@client': value } })
      return null
    },
  },
}
