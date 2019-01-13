//@flow
/**
 * in this function
 * default values are set
 * but only those that are async
 */
import get from 'lodash/get'

export default async ({ idb }) => {
  const users = await idb.users.toArray()
  const initialStore = {
    login: {
      token: get(users, '[0].token', null),
      username: get(users, '[0].username', ''),
    },
  }

  return initialStore
}
