// @flow
import React from 'react'
import TextField from '@material-ui/core/TextField'
import FormHelperText from '@material-ui/core/FormHelperText'
import FormControl from '@material-ui/core/FormControl'
import Snackbar from '@material-ui/core/Snackbar'
import Button from '@material-ui/core/Button'
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'
import InputAdornment from '@material-ui/core/InputAdornment'
import IconButton from '@material-ui/core/IconButton'
import Visibility from '@material-ui/icons/Visibility'
import VisibilityOff from '@material-ui/icons/VisibilityOff'
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
import ErrorBoundary from '../shared/ErrorBoundary'

const Container = styled.div`
  padding: 10px;
`
const StyledButton = styled(Button)`
  border: 1px solid !important;
  margin-top: 5px;
`
const StyledSnackbar = styled(Snackbar)`
  div {
    min-width: auto;
    background-color: #2e7d32 !important;
  }
`

const enhance = compose(
  withApollo,
  historyAfterLoginData,
  loginData,
  withState('name', 'changeName', ''),
  withState('pass', 'changePass', ''),
  withState('showPass', 'changeShowPass', false),
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
  showPass,
  nameErrorText,
  passErrorText,
  changeNameErrorText,
  changePassErrorText,
  changeShowPass,
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
  showPass: Boolean,
  changePass: () => void,
  nameErrorText: string,
  changeNameErrorText: () => void,
  passErrorText: string,
  changePassErrorText: () => void,
  changeShowPass: () => void,
  onBlurName: () => void,
  onBlurPassword: () => void,
  fetchLogin: () => void,
  onLogout: () => void,
  loginDate: Object,
  loginSuccessfull: Boolean,
}) => {
  const token = get(loginData, 'login.token')

  return (
    <ErrorBoundary>
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
            <FormHelperText id="name-error-text">
              {nameErrorText}
            </FormHelperText>
          </FormControl>
        )}
        {!token && (
          <FormControl fullWidth error={!!passErrorText}>
            <InputLabel htmlFor="password">Passwort</InputLabel>
            <Input
              id="adornment-password"
              type={showPass ? 'text' : 'password'}
              defaultValue={pass}
              onBlur={onBlurPassword}
              fullWidth
              onKeyPress={e => {
                if (e.key === 'Enter') {
                  onBlurPassword(e)
                }
              }}
              autoComplete="current-password"
              autoCorrect="off"
              spellCheck="false"
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => changeShowPass(!showPass)}
                    onMouseDown={e => e.preventDefault()}
                    title={showPass ? 'verstecken' : 'anzeigen'}
                  >
                    {showPass ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />
            <FormHelperText id="name-error-text">
              {passErrorText}
            </FormHelperText>
          </FormControl>
        )}
        {!token && <StyledButton>anmelden</StyledButton>}
        {!!token && <StyledButton onClick={onLogout}>abmelden</StyledButton>}
        <StyledSnackbar
          open={loginSuccessfull}
          message={`Willkommen ${name}`}
        />
      </Container>
    </ErrorBoundary>
  )
}

export default enhance(Login)
