// @flow
import React from 'react'
import TextField from 'material-ui/TextField'
import Snackbar from 'material-ui/Snackbar'
import styled from 'styled-components'
import compose from 'recompose/compose'
import withHandlers from 'recompose/withHandlers'
import withState from 'recompose/withState'
import {
  withApollo
} from 'react-apollo'
import get from 'lodash/get'
import jwtDecode from 'jwt-decode'
import app from 'ampersand-app'

import loginMutation from './loginMutation'
import setLoginMutation from '../../modules/loginMutation'
import historyAfterLoginMutation from '../../modules/historyAfterLoginMutation'
import historyAfterLoginData from '../../modules/historyAfterLoginData'

const Container = styled.div `
  padding: 10px;
`
const snackbarBodyStyle = {
  maxWidth: 'auto',
  minWidth: 'auto',
  backgroundColor: '#2E7D32',
}

const enhance = compose(
  withApollo,
  historyAfterLoginData,
  withState('name', 'changeName', ''),
  withState('pass', 'changePass', ''),
  withState('nameErrorText', 'changeNameErrorText', ''),
  withState('passErrorText', 'changePassErrorText', ''),
  withState('loginSuccessfull', 'changeLoginSuccessfull', false),
  withHandlers({
    fetchLogin: props => async(namePassed, passPassed) => {
      const {
        client,
        changeNameErrorText,
        changePassErrorText,
        changeName,
        changePass,
        changeLoginSuccessfull,
        historyAfterLoginData,
      } = props
      // when bluring fields need to pass event value
      // on the other hand when clicking on Anmelden button,
      // need to grab props
      const name = namePassed || props.name
      const pass = passPassed || props.pass
      if (!name) {
        return changeNameErrorText(
          'Geben Sie den Ihnen zugeteilten Benutzernamen ein'
        )
      }
      if (!pass) {
        return changePassErrorText('Bitte Passwort eingeben')
      }
      let result
      try {
        result = await client.mutate({
          mutation: loginMutation,
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
        const {
          role,
          username
        } = tokenDecoded
        // refresh currentUser in idb
        await app.idb.users.clear()
        await app.idb.users.put({
          username,
          token: jwtToken,
          role,
        })
        client.mutate({
          mutation: setLoginMutation,
          variables: {
            username,
            role,
            token: jwtToken,
          },
        })
        changeNameErrorText(null)
        changePassErrorText(null)
        changeLoginSuccessfull(true)
        setTimeout(() => {
          changeName('')
          changePass('')
          changeLoginSuccessfull(false)
          const historyAfterLogin = get(
            historyAfterLoginData,
            'historyAfterLogin'
          )
          const newPath = historyAfterLogin ? historyAfterLogin : '/Taxonomien'
          app.history.push(newPath)
          if (!!historyAfterLogin) {
            client.mutate({
              mutation: historyAfterLoginMutation,
              variables: {
                value: '',
              },
            })
          }
        }, 2000)
      }
    },
  }),
  withHandlers({
    onBlurName: ({
      pass,
      changeName,
      changeNameErrorText,
      fetchLogin,
    }) => e => {
      changeNameErrorText('')
      const name = e.target.value
      changeName(name)
      if (!name) {
        changeNameErrorText('Geben Sie den Ihnen zugeteilten Benutzernamen ein')
      } else if (pass) {
        fetchLogin(name, pass)
      }
    },
    onBlurPassword: props => e => {
      const {
        name,
        changePass,
        changePassErrorText,
        fetchLogin
      } = props
      changePassErrorText('')
      const pass = e.target.value
      changePass(pass)
      if (!pass) {
        changePassErrorText('Bitte Passwort eingeben')
      } else if (name) {
        fetchLogin(name, pass)
      }
    },
  })
)

const Login = ({
  store,
  name,
  pass,
  nameErrorText,
  passErrorText,
  changeNameErrorText,
  changePassErrorText,
  onBlurName,
  onBlurPassword,
  fetchLogin,
  loginSuccessfull,
}: {
  store: Object,
  name: string,
  changeName: () => void,
  pass: string,
  changePass: () => void,
  nameErrorText: string,
  changeNameErrorText: () => void,
  passErrorText: string,
  changePassErrorText: () => void,
  onBlurName: () => void,
  onBlurPassword: () => void,
  fetchLogin: () => void,
  loginSuccessfull: Boolean,
}) => ( <
  Container >
  <
  TextField floatingLabelText = "Name"
  defaultValue = {
    name
  }
  onBlur = {
    onBlurName
  }
  errorText = {
    nameErrorText
  }
  fullWidth autoFocus onKeyPress = {
    e => {
      if (e.key === 'Enter') {
        onBlurName(e)
      }
    }
  }
  />{' '} <
  TextField floatingLabelText = "Passwort"
  type = "password"
  defaultValue = {
    pass
  }
  onBlur = {
    onBlurPassword
  }
  errorText = {
    passErrorText
  }
  fullWidth onKeyPress = {
    e => {
      if (e.key === 'Enter') {
        onBlurPassword(e)
      }
    }
  }
  />{' '} <
  Snackbar open = {
    loginSuccessfull
  }
  message = {
    `Willkommen ${name}`
  }
  bodyStyle = {
    snackbarBodyStyle
  }
  /> <
  /Container>
)

export default enhance(Login)