// @flow

export default {
  Mutation: {
    setLogin: (_, { token, username }, { cache }) => {
      const login = { token, username, __typename: 'Login' }
      cache.writeData({ data: { login } })
      return null
    },
  },
}
