// @flow
import app from 'ampersand-app'
import get from 'lodash/get'

import setLoginMutation from './loginMutation'

export default async (client: Object): void => {
  const users = await app.idb.users.toArray()
  const token = get(users, '[0].token')
  const username = get(users, '[0].username')
  if (username && token) {
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
