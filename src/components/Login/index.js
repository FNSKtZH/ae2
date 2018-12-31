// @flow
import React, { useState, useCallback } from 'react'
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
import { withApollo } from 'react-apollo'
import app from 'ampersand-app'
import get from 'lodash/get'

import fetchLoginModule from './fetchLogin'
import withHistoryAfterLoginData from '../../modules/historyAfterLoginData'
import setLoginMutation from '../../modules/loginMutation'
import withLoginData from '../../modules/withLoginData'
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
  withHistoryAfterLoginData,
  withLoginData,
)

const Login = ({
  client,
  historyAfterLoginData,
  loginData,
}: {
  client: Object,
  historyAfterLoginData: Object,
  loginData: Object,
}) => {
  const token = get(loginData, 'login.token')

  const [name, changeName] = useState('')
  const [pass, changePass] = useState('')
  const [showPass, changeShowPass] = useState(false)
  const [nameErrorText, changeNameErrorText] = useState('')
  const [passErrorText, changePassErrorText] = useState('')
  const [loginSuccessfull, changeLoginSuccessfull] = useState(false)

  const fetchLogin = useCallback(
    (namePassed, passPassed) =>
      fetchLoginModule({
        client,
        changeNameErrorText,
        changePassErrorText,
        name,
        changeName,
        pass,
        changePass,
        changeLoginSuccessfull,
        historyAfterLoginData,
        namePassed,
        passPassed,
      }),
    [name, pass, historyAfterLoginData],
  )
  const onLogout = useCallback(() => {
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
  })
  const onBlurName = useCallback(
    e => {
      changeNameErrorText('')
      const name = e.target.value
      changeName(name)
      if (!name) {
        changeNameErrorText('Geben Sie den Ihnen zugeteilten Benutzernamen ein')
      } else if (pass) {
        fetchLogin(name, pass)
      }
    },
    [pass],
  )
  const onBlurPassword = useCallback(
    e => {
      changePassErrorText('')
      const pass = e.target.value
      changePass(pass)
      if (!pass) {
        changePassErrorText('Bitte Passwort eingeben')
      } else if (name) {
        fetchLogin(name, pass)
      }
    },
    [name],
  )
  const onKeyPressName = useCallback(e => {
    if (e.key === 'Enter') {
      onBlurName(e)
    }
  })
  const onKeyPressPass = useCallback(e => {
    if (e.key === 'Enter') {
      onBlurPassword(e)
    }
  })
  const onClickTogglePass = useCallback(() => changeShowPass(!showPass), [
    showPass,
  ])
  const onMouseDownTogglePass = useCallback(e => e.preventDefault())

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
              onKeyPress={onKeyPressName}
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
              onKeyPress={onKeyPressPass}
              autoComplete="current-password"
              autoCorrect="off"
              spellCheck="false"
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    onClick={onClickTogglePass}
                    onMouseDown={onMouseDownTogglePass}
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
