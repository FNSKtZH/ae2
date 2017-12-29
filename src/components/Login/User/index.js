// @flow
import React from 'react'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import styled from 'styled-components'
import compose from 'recompose/compose'
import withHandlers from 'recompose/withHandlers'
import withState from 'recompose/withState'
import {
  withApollo
} from 'react-apollo'
import app from 'ampersand-app'
import get from 'lodash/get'

import setLoginMutation from '../../../modules/loginMutation'
import loginData from '../../../modules/loginData'
import userData from './userData'
import Roles from './Roles'
import PCs from './PCs'

const Container = styled.div `
  padding: 10px;
`

const enhance = compose(
  withApollo,
  loginData,
  userData,
  withState('name', 'changeName', ({
    userData
  }) => get(userData, 'userByName', {}).name || ''),
  withState('email', 'changeEmail', ({
    userData
  }) => get(userData, 'userByName', {}).email || ''),
  withState('pass', 'changePass', ''),
  withState('nameErrorText', 'changeNameErrorText', ''),
  withState('emailErrorText', 'changeEmailErrorText', ''),
  withState('passErrorText', 'changePassErrorText', ''),
  withHandlers({
    logout: props => async() => {
      const {
        client
      } = props
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
    save: ({
      userData,
      name,
      email,
      pass
    }) => () => {
      // check if name or email is changed or password is set
      //const user = get(userData, 'userByName', {})
      //const changed = !!pass || name !== user.name || email !== user.email
    },
  })
)

const User = ({
    store,
    name,
    email,
    pass,
    nameErrorText,
    emailErrorText,
    changeNameErrorText,
    changeEmailErrorText,
    onBlurName,
    onBlurEmail,
    onBlurPassword,
    logout,
    save,
    loginData,
    userData
  }: {
    store: Object,
    name: String,
    changeName: () => void,
    email: String,
    pass: String,
    changeEmail: () => void,
    nameErrorText: String,
    changeNameErrorText: () => void,
    emailErrorText: String,
    changeEmailErrorText: () => void,
    onBlurName: () => void,
    onBlurEmail: () => void,
    onBlurPassword: () => void,
    logout: () => void,
    save: () => void,
    loginData: Object,
    userData: Object,
  }) => {
    const user = get(userData, 'userByName', {})
    const orgUsers = get(user, 'organizationUsersByUserId.nodes', [])
    const pcs = get(user, 'propertyCollectionsByImportedBy.nodes', [])
    const saveDisabled = !pass && name === user.name && email === user.email
    console.log('User: name:', name)
    console.log('User: user.name:', user.name)
    console.log('User: email:', email)
    console.log('User: user.email:', user.email)
    console.log('User: pass:', pass)
    console.log('User: saveDisabled:', saveDisabled)

    return ( <
        Container >
        <
        TextField floatingLabelText = "Name"
        value = {
          user.name || ''
        }
        onBlur = {
          onBlurName
        }
        errorText = {
          nameErrorText
        }
        autoFocus onKeyPress = {
          e => {
            if (e.key === 'Enter') {
              onBlurName(e)
            }
          }
        }
        /> <
        TextField floatingLabelText = "Email"
        value = {
          user.email || ''
        }
        onBlur = {
          onBlurEmail
        }
        errorText = {
          emailErrorText
        }
        onKeyPress = {
          e => {
            if (e.key === 'Enter') {
              onBlurEmail(e)
            }
          }
        }
        /> <
        TextField floatingLabelText = "Passwort"
        type = "password"
        value = {
          pass
        }
        onBlur = {
          onBlurPassword
        }
        onKeyPress = {
          e => {
            if (e.key === 'Enter') {
              onBlurPassword(e)
            }
          }
        }
        /> <
        RaisedButton label = "Änderungen speichern"
        onClick = {
          save
        }
        disabled = {
          saveDisabled
        }
        /> {
          orgUsers.length > 0 && < Roles orgUsers = {
            orgUsers
          }
          />} {
            pcs.length > 0 && < PCs pcs = {
              pcs
            }
            />} <
            RaisedButton label = "Neu anmelden"
            onClick = {
              logout
            }
            /> <
            /Container>
          )
        }

        export default enhance(User)