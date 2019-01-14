// @flow
import get from 'lodash/get'
import jwtDecode from 'jwt-decode'

import loginDbMutation from './loginDbMutation'

export default async ({
  client,
  changeNameErrorText,
  changePassErrorText,
  name: propsName,
  changeName,
  pass: propsPass,
  changePass,
  changeLoginSuccessfull,
  namePassed,
  passPassed,
  idb,
  history,
  mobxStore,
}: {
  client: Object,
  changeNameErrorText: () => void,
  changePassErrorText: () => void,
  name: string,
  changeName: () => void,
  pass: string,
  changePass: () => void,
  changeLoginSuccessfull: () => void,
  namePassed: String,
  passPassed: String,
  idb: Object,
  history: Object,
  mobxStore: Object,
}) => {
  const { historyAfterLogin, setHistoryAfterLogin, setLogin, login } = mobxStore
  // when bluring fields need to pass event value
  // on the other hand when clicking on Anmelden button,
  // need to grab props
  const name = namePassed || propsName
  const pass = passPassed || propsPass
  if (!name) {
    return changeNameErrorText('Bitte Benutzernamen eingeben')
  }
  if (!pass) {
    return changePassErrorText('Bitte Passwort eingeben')
  }
  // reset existing token
  await idb.users.clear()
  setLogin({
    username: '',
    token: '',
  })
  // now aquire new token
  try {
    await client.mutate({
      mutation: loginDbMutation,
      variables: {
        username: name,
        pass,
      },
    })
  } catch (error) {
    const messages = error.graphQLErrors.map(x => x.message)
    const isNamePassError =
      messages.includes('invalid user or password') ||
      messages.includes('permission denied for relation user')
    if (isNamePassError) {
      const message = 'Name oder Passwort nicht bekannt'
      changeNameErrorText(message)
      return changePassErrorText(message)
    }
    return console.log(error)
  }
  const jwtToken = login.jwtToken
  if (jwtToken) {
    const tokenDecoded = jwtDecode(jwtToken)
    const { username } = tokenDecoded
    // refresh currentUser in idb
    await idb.users.clear()
    await idb.users.put({
      username,
      token: jwtToken,
    })
    try {
      setLogin({
        username,
        token: jwtToken,
      })
    } catch (error) {
      console.log(('Error during mutation': error))
    }
    changeNameErrorText(null)
    changePassErrorText(null)
    changeLoginSuccessfull(true)
    setTimeout(() => {
      changeName('')
      changePass('')
      changeLoginSuccessfull(false)
      if (!!historyAfterLogin) {
        history.push(historyAfterLogin)
        setHistoryAfterLogin('')
      } else {
        history.push('/')
      }
    }, 2000)
  }
}
