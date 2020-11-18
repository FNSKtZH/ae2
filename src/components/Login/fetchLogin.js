import { navigate } from 'gatsby'

import jwtDecode from 'jwt-decode'
import get from 'lodash/get'

import loginDbMutation from './loginDbMutation'

const fetchLogin = async ({
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
  mobxStore,
  nameInput,
  passwordInput,
}) => {
  const { historyAfterLogin, setHistoryAfterLogin, login } = mobxStore
  const { setLogin } = login
  // when bluring fields need to pass event value
  // on the other hand when clicking on Anmelden button,
  // need to grab props
  const name = namePassed || propsName || nameInput.current.value
  const pass = passPassed || propsPass || passwordInput.current.value
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
  let result
  try {
    result = await client.mutate({
      mutation: loginDbMutation,
      variables: {
        username: name,
        pass,
      },
    })
  } catch (error) {
    const messages = error.graphQLErrors.map((x) => x.message)
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
  const jwtToken = get(result, 'data.login.jwtToken')
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
      console.log(('Error during mutation', error))
    }
    changeNameErrorText(null)
    changePassErrorText(null)
    changeLoginSuccessfull(true)
    setTimeout(() => {
      changeName('')
      changePass('')
      changeLoginSuccessfull(false)
      if (!!historyAfterLogin) {
        navigate(historyAfterLogin)
        setHistoryAfterLogin('')
      } else {
        navigate('/')
      }
    }, 2000)
  }
}

export default fetchLogin
