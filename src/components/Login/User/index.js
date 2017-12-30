// @flow
import React, { Component } from 'react'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import styled from 'styled-components'
import compose from 'recompose/compose'
import { withApollo } from 'react-apollo'
import app from 'ampersand-app'
import get from 'lodash/get'

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
    this.state = { name: undefined, email: undefined, pass: '', passNew: '' }
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
      this.setState({ name: propsUser.name, email: propsUser.email })
    }
  }

  onChangeName = (e, value) => {
    this.setState({ name: value })
  }

  onChangeEmail = (e, value) => {
    this.setState({ email: value })
  }

  onChangePass = (e, value) => {
    this.setState({ pass: value })
  }

  onChangePassNew = (e, value) => {
    this.setState({ passNew: value })
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

  onSave = () => {
    const { name: usernameNew, email, pass, passNew } = this.state
    const { userData, client } = this.props
    const { name: username } = get(userData, 'userByName', {})
    client.mutate({
      mutation: userMutation,
      variables: {
        username,
        usernameNew,
        email,
        pass,
        passNew: passNew ? passNew : pass,
      },
    })
  }

  render() {
    const { userData } = this.props
    const { name, email, pass, passNew } = this.state
    const user = get(userData, 'userByName', {})
    const orgUsers = get(user, 'organizationUsersByUserId.nodes', [])
    const pcs = get(user, 'propertyCollectionsByImportedBy.nodes', [])
    const saveDisabled =
      !pass &&
      (!(!!name && !!user.name && !!email && !!user.email) ||
        (name === user.name && email === user.email))
    const showPass =
      !!name &&
      !!user.name &&
      !!email &&
      !!user.email &&
      (name !== user.name || email !== user.email)
    const saveEnabled = !!pass && showPass

    return (
      <Container>
        <TextField
          floatingLabelText="Name"
          value={name}
          onChange={this.onChangeName}
          fullWidth
        />
        <TextField
          floatingLabelText="Email"
          value={email}
          onChange={this.onChangeEmail}
          fullWidth
        />
        {showPass && (
          <TextField
            floatingLabelText="Passwort (aktuell)"
            type="password"
            value={pass}
            onChange={this.onChangePass}
            fullWidth
          />
        )}
        <TextField
          floatingLabelText="Passwort (neu)"
          type="password"
          value={passNew}
          onChange={this.onChangePassNew}
          fullWidth
        />
        <RaisedButton
          label="Änderungen speichern"
          onClick={this.onSave}
          disabled={!saveEnabled}
        />
        {orgUsers.length > 0 && <Roles orgUsers={orgUsers} />}
        {pcs.length > 0 && <PCs pcs={pcs} />}
        <RaisedButton label="Neu anmelden" onClick={this.onLogout} />
      </Container>
    )
  }
}

export default enhance(User)
