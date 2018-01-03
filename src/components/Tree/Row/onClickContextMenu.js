// @flow
import createUserMutation from '../../Benutzer/createUserMutation'

export default async ({
  e,
  data,
  target,
  client,
  userData,
}: {
  e: Object,
  data: Object,
  target: Object,
  client: Object,
  userData: Object,
}) => {
  if (!data) return console.log('no data passed with click')
  if (!target) {
    return console.log('no target passed with click')
  }
  const { table, action } = data
  const id = target.firstElementChild.getAttribute('data-id')
  const actions = {
    insert: async () => {
      if (table === 'user') {
        // TODO
        console.log('Row, hancleClick: should create new user')
        //createUserMutation
        let newUser
        try {
          newUser = await client.mutate({
            mutation: createUserMutation,
          })
        } catch (error) {
          console.log(error)
        }
        console.log('newUser:', newUser)
        console.log('userData:', userData)
        const refetchResult = await userData.refetch()
        console.log('refetchResult:', refetchResult)
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
  }
}
