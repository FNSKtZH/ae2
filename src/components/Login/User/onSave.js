// @flow
/**
 * for unknown reason prettier breaks if async function
 * is built directly in class
 * that is why this is modularized
 */
import app from 'ampersand-app'
import get from 'lodash/get'
import jwtDecode from 'jwt-decode'

import setLoginMutation from '../../../modules/loginMutation'
import userMutation from './userMutation'

export default async ({ props, state }: { props: Object, state: Object }) => {
  const { name: usernameNew, email, pass, passNew } = state
  const { userData, client } = props
  const { name: username } = get(userData, 'userByName', {})
  let result
  try {
    result = await client.mutate({
      mutation: userMutation,
      variables: {
        username,
        usernameNew,
        email,
        pass,
        passNew: passNew ? passNew : pass,
      },
    })
  } catch (error) {
    const messages = error.graphQLErrors.map(x => x.message)
    const isNamePassError =
      messages.includes('invalid user or password') ||
      messages.includes('permission denied for relation user')
    if (isNamePassError) {
      const message = 'Name oder Passwort nicht bekannt'
      return this.setState({
        nameErrorText: message,
        passErrorText: message,
      })
    }
    return console.log(error)
  }
  const jwtToken = get(result, 'data.login.jwtToken')
  if (jwtToken) {
    const tokenDecoded = jwtDecode(jwtToken)
    const { role, username } = tokenDecoded
    // refresh currentUser in idb
    await app.idb.users.clear()
    // seems that need to reset first?
    await client.mutate({
      mutation: setLoginMutation,
      variables: {
        username: '',
        role: '',
        token: '',
      },
    })
    try {
      await app.idb.users.put({
        username,
        token: jwtToken,
        role,
      })
    } catch (error) {
      console.log(('Error putting new user to idb': error))
    }
    try {
      await client.mutate({
        mutation: setLoginMutation,
        variables: {
          username,
          role,
          token: jwtToken,
        },
      })
    } catch (error) {
      console.log(('Error during setLoginMutation': error))
    }
    return
  }
}
