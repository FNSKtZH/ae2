// @flow
import React from 'react'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import styled from 'styled-components'
import compose from 'recompose/compose'
import withHandlers from 'recompose/withHandlers'
import { withApollo } from 'react-apollo'
import app from 'ampersand-app'
import get from 'lodash/get'

import setLoginMutation from '../../../modules/loginMutation'
import loginData from '../../../modules/loginData'
import userData from './userData'

const Container = styled.div`
  padding: 10px;
`

const enhance = compose(
  withApollo,
  loginData,
  userData,
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
  userData,
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
  userData: Object,
}) => {
  const user = get(userData, 'userByName', {})
  user.name && console.log('User: user:', user)

  return (
    <Container>
      <TextField
        floatingLabelText="Name"
        value={user.name || ''}
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
        floatingLabelText="Email"
        value={user.email || ''}
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
}

export default enhance(User)
