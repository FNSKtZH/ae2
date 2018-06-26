// @flow

export default {
  Mutation: {
    setLoginInStore: (_, { token, username }, { cache }) => {
      console.log('login store, setting:', {token,username})
      const login = { token, username, __typename: 'Login' }
      cache.writeData({ data: { login } })
      return null
    },
  },
}
