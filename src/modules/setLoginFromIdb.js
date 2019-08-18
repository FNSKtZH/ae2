import get from 'lodash/get'

export default async ({
  client,
  idb,
  mobxStore,
}: {
  client: Object,
  idb: Object,
  mobxStore: Object,
}): void => {
  const users = await idb.users.toArray()
  const token = get(users, '[0].token')
  const username = get(users, '[0].username')
  if (username && token) {
    mobxStore.login.setLogin({ username, token })
  }
}
