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
import Roles from './Roles'
import PCs from './PCs'

const Container = styled.div`
  padding: 10px;
`

const enhance = compose(
  withApollo,
  loginData,
  userData,
  withHandlers({
    logout: props => async () => {
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
    save: props => () => {
      // check if name or email is changed
    },
  })
)

const User = ({
  store,
  name,
  email,
  nameErrorText,
  emailErrorText,
  changeNameErrorText,
  changeEmailErrorText,
  onBlurName,
  onBlurEmail,
  onBlurPassword,
  logout,
  save,
  loginSuccessfull,
  loginData,
  userData,
}: {
  store: Object,
  name: string,
  changeName: () => void,
  email: string,
  changeEmail: () => void,
  nameErrorText: string,
  changeNameErrorText: () => void,
  emailErrorText: string,
  changeEmailErrorText: () => void,
  onBlurName: () => void,
  onBlurEmail: () => void,
  onBlurPassword: () => void,
  logout: () => void,
  save: () => void,
  loginSuccessfull: Boolean,
  loginData: Object,
  userData: Object,
}) => {
  const user = get(userData, 'userByName', {})
  const orgUsers = get(user, 'organizationUsersByUserId.nodes', [])
  const pcs = get(user, 'propertyCollectionsByImportedBy.nodes', [])

  return (
    <Container>
      <TextField
        floatingLabelText="Name"
        value={user.name || ''}
        onBlur={onBlurName}
        errorText={nameErrorText}
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
        onBlur={onBlurEmail}
        errorText={emailErrorText}
        onKeyPress={e => {
          if (e.key === 'Enter') {
            onBlurEmail(e)
          }
        }}
      />
      <TextField
        floatingLabelText="Passwort"
        type="password"
        defaultValue=""
        onBlur={onBlurPassword}
        onKeyPress={e => {
          if (e.key === 'Enter') {
            onBlurPassword(e)
          }
        }}
      />
      <RaisedButton label="Änderungen speichern" onClick={save} />
      {orgUsers.length > 0 && <Roles orgUsers={orgUsers} />}
      {pcs.length > 0 && <PCs pcs={pcs} />}
      <RaisedButton label="Neu anmelden" onClick={logout} />
    </Container>
  )
}

export default enhance(User)
