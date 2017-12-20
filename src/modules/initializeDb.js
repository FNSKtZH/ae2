// @flow
import Dexie from 'dexie'

export default () => {
  // create table to save user login in
  // this helps in that user can open new tab and remain logged in!
  const db = new Dexie('ae')
  db.version(1).stores({
    users: 'token,role,username',
  })
  return db
}
