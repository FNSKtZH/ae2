// @flow
import get from 'lodash/get'
import jwtDecode from 'jwt-decode'
import app from 'ampersand-app'

import loginDbMutation from './loginDbMutation'
import loginStoreMutation from '../../modules/loginMutation'
import historyAfterLoginMutation from '../../modules/historyAfterLoginMutation'

export default async ({
  client,
  changeNameErrorText,
  changePassErrorText,
  name: propsName,
  changeName,
  pass: propsPass,
  changePass,
  changeLoginSuccessfull,
  historyAfterLogin,
  namePassed,
  passPassed,
  idb,
}: {
  client: Object,
  changeNameErrorText: () => void,
  changePassErrorText: () => void,
  name: string,
  changeName: () => void,
  pass: string,
  changePass: () => void,
  changeLoginSuccessfull: () => void,
  historyAfterLogin: String,
  namePassed: String,
  passPassed: String,
  idb: Object,
}) => {
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
  client.mutate({
    mutation: loginStoreMutation,
    variables: {
      username: '',
      token: '',
    },
    optimisticResponse: {
      setLoginInStore: {
        username: '',
        token: '',
        __typename: 'Login',
      },
      __typename: 'Mutation',
    },
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
      client.mutate({
        mutation: loginStoreMutation,
        variables: {
          username,
          token: jwtToken,
        },
        optimisticResponse: {
          setLoginInStore: {
            username,
            token: jwtToken,
            __typename: 'Login',
          },
          __typename: 'Mutation',
        },
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
        app.history.push(historyAfterLogin)
        client.mutate({
          mutation: historyAfterLoginMutation,
          variables: {
            value: '',
          },
          optimisticResponse: {
            setHistoryAfterLogin: {
              historyAfterLogin,
              __typename: 'HistoryAfterLogin',
            },
            __typename: 'Mutation',
          },
        })
      } else {
        app.history.push('/')
      }
    }, 2000)
  }
}
