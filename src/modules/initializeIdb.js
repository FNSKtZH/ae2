// @flow
import Dexie from 'dexie'

export default () => {
  // create table to save user login in
  // this helps in that user can open new tab and remain logged in!
  const idb = new Dexie('ae')
  idb.version(2).stores({
    users: '++id,token,username',
  })
  return idb
}
