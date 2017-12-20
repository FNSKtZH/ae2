// @flow
import app from 'ampersand-app'

import loginMutation from './loginMutation'

export default (client: Object): void =>
  app.db.users
    .toArray()
    .then(users => {
      console.log('setLoginFromIdb: users:', users)
      if (users[0] && users[0].name && users[0].role && users[0].token) {
        const { name, role, token } = users[0]
        client.mutate({
          mutation: loginMutation,
          variables: { name, role, token },
        })
      }
    })
    .catch(error => {
      console.log(error)
    })
