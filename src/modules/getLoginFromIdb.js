// @flow
import app from 'ampersand-app'

export default async (): void => {
  const users = await app.idb.users.toArray()
  if (users[0] && users[0].username && users[0].token) {
    return users[0]
  }
  return { token: '', username: '' }
}
