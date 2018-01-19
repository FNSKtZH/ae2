// @flow
import React from 'react'
import TextField from 'material-ui-next/TextField'
import { FormControl, FormHelperText } from 'material-ui-next/Form'
import Snackbar from 'material-ui/Snackbar'
import Button from 'material-ui-next/Button'
import styled from 'styled-components'
import compose from 'recompose/compose'
import withHandlers from 'recompose/withHandlers'
import withState from 'recompose/withState'
import { withApollo } from 'react-apollo'
import app from 'ampersand-app'
import get from 'lodash/get'

import fetchLogin from './fetchLogin'
import historyAfterLoginData from '../../modules/historyAfterLoginData'
import setLoginMutation from '../../modules/loginMutation'
import loginData from '../../modules/loginData'

const Container = styled.form`
  padding: 10px;
`
const StyledButton = styled(Button)`
  border: 1px solid !important;
  margin-top: 5px;
`
const snackbarBodyStyle = {
  maxWidth: 'auto',
  minWidth: 'auto',
  backgroundColor: '#2E7D32',
}

const enhance = compose(
  withApollo,
  historyAfterLoginData,
  loginData,
  withState('name', 'changeName', ''),
  withState('pass', 'changePass', ''),
  withState('nameErrorText', 'changeNameErrorText', ''),
  withState('passErrorText', 'changePassErrorText', ''),
  withState('loginSuccessfull', 'changeLoginSuccessfull', false),
  withHandlers({
    fetchLogin: props => (namePassed, passPassed) =>
      fetchLogin({
        props,
        namePassed,
        passPassed,
      }),
    onLogout: ({ client }) => () => {
      app.idb.users.clear()
      client.mutate({
        mutation: setLoginMutation,
        variables: {
          username: '',
          role: '',
          token: '',
        },
      })
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
      const { name, changePass, changePassErrorText, fetchLogin } = props
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
  name,
  pass,
  nameErrorText,
  passErrorText,
  changeNameErrorText,
  changePassErrorText,
  onBlurName,
  onBlurPassword,
  fetchLogin,
  onLogout,
  loginSuccessfull,
  loginData,
}: {
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
  onLogout: () => void,
  loginDate: Object,
  loginSuccessfull: Boolean,
}) => {
  const token = get(loginData, 'login.token')

  return (
    <Container>
      {!token && (
        <FormControl fullWidth error={!!nameErrorText}>
          <TextField
            label="Name"
            defaultValue={name}
            onBlur={onBlurName}
            fullWidth
            autoFocus
            onKeyPress={e => {
              if (e.key === 'Enter') {
                onBlurName(e)
              }
            }}
            autoComplete="username"
          />
          <FormHelperText id="name-error-text">{nameErrorText}</FormHelperText>
        </FormControl>
      )}
      {!token && (
        <FormControl fullWidth error={!!passErrorText}>
          <TextField
            label="Passwort"
            type="password"
            defaultValue={pass}
            onBlur={onBlurPassword}
            fullWidth
            onKeyPress={e => {
              if (e.key === 'Enter') {
                onBlurPassword(e)
              }
            }}
            autoComplete="current-password"
          />
          <FormHelperText id="name-error-text">{passErrorText}</FormHelperText>
        </FormControl>
      )}
      {!token && <StyledButton>anmelden</StyledButton>}
      {!!token && <StyledButton onClick={onLogout}>abmelden</StyledButton>}
      <Snackbar
        open={loginSuccessfull}
        message={`Willkommen ${name}`}
        bodyStyle={snackbarBodyStyle}
      />
    </Container>
  )
}

export default enhance(Login)
