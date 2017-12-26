// @flow
import React from 'react'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import styled from 'styled-components'
import compose from 'recompose/compose'
import withHandlers from 'recompose/withHandlers'
import { withApollo } from 'react-apollo'
import app from 'ampersand-app'

import setLoginMutation from '../../modules/loginMutation'
import loginData from '../../modules/loginData'

const Container = styled.div`
  padding: 10px;
`

const enhance = compose(
  withApollo,
  loginData,
  withHandlers({
    logout: props => async (namePassed, passPassed) => {
      const { client } = props
      await app.idb.users.clear()
      client.mutate({
        mutation: setLoginMutation,
        variables: {
          username: '',
          role: '',
          token: '',
        },
      })
    },
  })
)

const User = ({
  store,
  name,
  pass,
  nameErrorText,
  passErrorText,
  changeNameErrorText,
  changePassErrorText,
  onBlurName,
  onBlurPassword,
  logout,
  loginSuccessfull,
  loginData,
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
  logout: () => void,
  loginSuccessfull: Boolean,
  loginData: Object,
}) => (
  <Container>
    <TextField
      floatingLabelText="Name ändern"
      defaultValue={name}
      onBlur={onBlurName}
      errorText={nameErrorText}
      fullWidth
      autoFocus
      onKeyPress={e => {
        if (e.key === 'Enter') {
          onBlurName(e)
        }
      }}
    />
    <TextField
      floatingLabelText="Passwort ändern"
      type="password"
      defaultValue={pass}
      onBlur={onBlurPassword}
      errorText={passErrorText}
      fullWidth
      onKeyPress={e => {
        if (e.key === 'Enter') {
          onBlurPassword(e)
        }
      }}
    />
    <RaisedButton label="Neu anmelden" onClick={logout} />
  </Container>
)

export default enhance(User)
