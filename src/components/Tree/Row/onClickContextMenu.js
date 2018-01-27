// @flow
import get from 'lodash/get'
import app from 'ampersand-app'

import createUserMutation from '../../Benutzer/createUserMutation'
import deleteUserMutation from '../../Benutzer/deleteUserMutation'
import createObjectMutation from '../../Objekt/createObjectMutation'

export default async ({
  e,
  data,
  target,
  client,
  userData,
  treeData,
}: {
  e: Object,
  data: Object,
  target: Object,
  client: Object,
  userData: Object,
  treeData: Object,
}) => {
  if (!data) return console.log('no data passed with click')
  if (!target) {
    return console.log('no target passed with click')
  }
  const { table, action } = data
  const id = target.firstElementChild.getAttribute('data-id')
  const url = target.firstElementChild.getAttribute('data-url').split(',')
  const actions = {
    insert: async () => {
      if (table === 'user') {
        let newUser
        try {
          newUser = await client.mutate({
            mutation: createUserMutation,
          })
        } catch (error) {
          console.log(error)
        }
        const newUserId = get(newUser, 'data.createUser.user.id')
        userData.refetch()
        treeData.refetch()
        !!newUserId && app.history.push(`/Benutzer/${newUserId}`)
      }
      if (table === 'object') {
        const newObjectData = await client.mutate({
          mutation: createObjectMutation,
          variables: { taxonomyId: url[2], parentId: id },
        })
        const newId = get(newObjectData, 'data.createObject.object.id', null)
        app.history.push(`/${[...url, newId].join('/')}`)
        treeData.refetch()
      }
    },
    delete: async () => {
      if (table === 'user') {
        try {
          await client.mutate({
            mutation: deleteUserMutation,
            variables: { id },
          })
        } catch (error) {
          console.log(error)
        }
        userData.refetch()
        treeData.refetch()
        app.history.push('/Benutzer')
      }
      if (table === 'object') {
        console.log('delete object with id:', id)
      }
    },
  }
  if (Object.keys(actions).includes(action)) {
    actions[action]()
  } else {
    console.log(`action "${action}" unknown, therefore not executed`)
  }
}
