// @flow

export default {
  Mutation: {
    setLogin: (_, { token, role, username }, { cache }) => {
      const login = { token, role, username, __typename: 'Login' }
      cache.writeData({ data: { login } })
      return null
    },
  },
}
