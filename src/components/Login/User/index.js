// @flow
import React, { Component } from 'react'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import styled from 'styled-components'
import compose from 'recompose/compose'
import { withApollo } from 'react-apollo'
import app from 'ampersand-app'
import get from 'lodash/get'
import jwtDecode from 'jwt-decode'

import setLoginMutation from '../../../modules/loginMutation'
import loginData from '../../../modules/loginData'
import userData from './userData'
import Roles from './Roles'
import PCs from './PCs'
import userMutation from './userMutation'

const Container = styled.div`
  padding: 10px;
`

const enhance = compose(withApollo, loginData, userData)

class User extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: undefined,
      nameErrorText: null,
      email: undefined,
      pass: '',
      passErrorText: 'Passwort nötig, um Änderungen zu speichern',
      passNew: '',
    }
  }

  props: {
    client: Object,
    loginData: Object,
    userData: Object,
  }

  componentDidUpdate(prevProps, prevState) {
    const propsUser = get(this.props.userData, 'userByName', {})
    const prevPropsUser = get(prevProps.userData, 'userByName', {})

    if (!!propsUser.id && prevPropsUser.id === undefined) {
      this.setState({
        name: propsUser.name,
        email: propsUser.email,
      })
    }
  }

  onChangeVal = (e, val) => {
    this.setState({
      [e.target.name]: val,
    })
  }

  onLogout = () => {
    const { client } = this.props
    app.idb.users.clear()
    client.mutate({
      mutation: setLoginMutation,
      variables: {
        username: '',
        role: '',
        token: '',
      },
    })
  }

  onSave = async () => {
    const { name: usernameNew, email, pass, passNew } = this.state
    const { userData, client } = this.props
    const { name: username } = get(userData, 'userByName', {})
    let result
    try {
      result = await client.mutate({
        mutation: userMutation,
        variables: {
          username,
          usernameNew,
          email,
          pass,
          passNew: passNew ? passNew : pass,
        },
      })
    } catch (error) {
      const messages = error.graphQLErrors.map(x => x.message)
      const isNamePassError =
        messages.includes('invalid user or password') ||
        messages.includes('permission denied for relation user')
      if (isNamePassError) {
        const message = 'Name oder Passwort nicht bekannt'
        return this.setState({
          nameErrorText: message,
          passErrorText: message,
        })
      }
      return console.log(error)
    }
    const jwtToken = get(result, 'data.login.jwtToken')
    if (jwtToken) {
      const tokenDecoded = jwtDecode(jwtToken)
      const { role, username } = tokenDecoded
      // refresh currentUser in idb
      await app.idb.users.clear()
      await app.idb.users.put({
        username,
        token: jwtToken,
        role,
      })
      try {
        client.mutate({
          mutation: setLoginMutation,
          variables: {
            username,
            role,
            token: jwtToken,
          },
        })
      } catch (error) {
        console.log(('Error during setLoginMutation': error))
      }
      this.setState({
        nameErrorText: null,
        passErrorText: null,
      })
    }
  }

  render() {
    const { userData } = this.props
    const {
      name,
      nameErrorText,
      email,
      pass,
      passErrorText,
      passNew,
    } = this.state
    const user = get(userData, 'userByName', {})
    const orgUsers = get(user, 'organizationUsersByUserId.nodes', [])
    const pcs = get(user, 'propertyCollectionsByImportedBy.nodes', [])
    const showPass =
      !!name &&
      !!user.name &&
      !!email &&
      !!user.email &&
      (name !== user.name || email !== user.email)
    const saveEnabled = !!pass && showPass

    return (
      <Container>
        <RaisedButton label="Neu anmelden" onClick={this.onLogout} />
        <TextField
          name="name"
          floatingLabelText="Name"
          errorText={nameErrorText}
          value={name}
          onChange={this.onChangeVal}
          fullWidth
        />
        <TextField
          name="email"
          floatingLabelText="Email"
          value={email}
          onChange={this.onChangeVal}
          fullWidth
        />
        <TextField
          name="passNew"
          floatingLabelText="Passwort ändern"
          type="password"
          value={passNew}
          onChange={this.onChangeVal}
          fullWidth
        />
        {showPass && (
          <TextField
            name="pass"
            floatingLabelText="Passwort (aktuell)"
            errorText={passErrorText}
            type="password"
            value={pass}
            onChange={this.onChangeVal}
            fullWidth
          />
        )}
        <RaisedButton
          label="Änderungen speichern"
          onClick={this.onSave}
          disabled={!saveEnabled}
        />
        {orgUsers.length > 0 && <Roles orgUsers={orgUsers} />}
        {pcs.length > 0 && <PCs pcs={pcs} />}
      </Container>
    )
  }
}

export default enhance(User)
