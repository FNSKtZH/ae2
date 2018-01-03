// @flow
import createUserMutation from '../../Benutzer/createUserMutation'

export default ({
  e,
  data,
  target,
  client,
}: {
  e: Object,
  data: Object,
  target: Object,
  client: Object,
}) => {
  if (!data) return console.log('no data passed with click')
  if (!target) {
    return console.log('no target passed with click')
  }
  const { table, action } = data
  const id = target.firstElementChild.getAttribute('data-id')
  const actions = {
    insert() {
      if (table === 'user') {
        // TODO
        console.log('Row, hancleClick: should create new user')
        //createUserMutation
        client.mutate({
          mutation: createUserMutation,
        })
      }
    },
    delete() {
      // TODO
      console.log('Row, hancleClick: should delete user with id:', id)
    },
  }
  if (Object.keys(actions).includes(action)) {
    actions[action]()
  } else {
    console.log(`action "${action}" unknown, therefore not executed`)
    /*store.listError(
      new Error(`action "${action}" unknown, therefore not executed`)
    )*/
  }
}
