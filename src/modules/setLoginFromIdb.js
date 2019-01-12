// @flow
import get from 'lodash/get'

import setLoginMutation from './loginMutation'

export default async ({
  client,
  idb,
}: {
  client: Object,
  idb: Object,
}): void => {
  const users = await idb.users.toArray()
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
