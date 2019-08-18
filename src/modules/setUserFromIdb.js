import get from 'lodash/get'

export default async ({ idb, mobxStore }) => {
  const users = await idb.users.toArray()
  const username = get(users, '[0].name', '')
  const token = get(users, '[0].token', null)

  mobxStore.login.setLogin({ username, token })
}
