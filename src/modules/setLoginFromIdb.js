// @flow
import app from 'ampersand-app'

import getLoginFromIdb from './getLoginFromIdb'
import setLoginMutation from './loginMutation'

export default async (client: Object): void => {
  const login = await getLoginFromIdb()
  if (login && login.username && login.role && login.token) {
    const { username, role, token } = login
    client.mutate({
      mutation: setLoginMutation,
      variables: { username, role, token },
    })
  }
}
