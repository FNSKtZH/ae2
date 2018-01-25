// @flow
import getLoginFromIdb from './getLoginFromIdb'
import setLoginMutation from './loginMutation'

export default async (client: Object): void => {
  const login = await getLoginFromIdb()
  if (login && login.username && login.token) {
    const { username, token } = login
    client.mutate({
      mutation: setLoginMutation,
      variables: { username, token },
      optimisticResponse: {
        setLoginInStore: {
          username,
          token,
          __typename: 'Login',
        },
        __typename: 'Mutation',
      },
    })
  }
}
