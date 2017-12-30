// @flow
import React, { Component } from 'react'
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
import userMutation from './userMutation'

const Container = styled.div`
  padding: 10px;
`

const enhance = compose(
  withApollo,
  loginData,
  userData,
  withHandlers({
    logout: props => async () => {},
  })
)

class User extends Component {
  constructor(props) {
    super(props)
    this.state = { name: undefined, email: undefined, pass: '' }
  }

  props: {
    logout: () => void,
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

  onLogout = async () => {
    const { client } = this.props
    await app.idb.users.clear()
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
    const { name: username_new, email, pass: pass_new } = this.state
    const { userData, client } = this.props
    const { name: username } = get(userData, 'userByName', {})
    client.mutate({
      mutation: userMutation,
      variables: { username, username_new, email, pass, pass_new },
    })
  }

  render() {
    const { logout, userData } = this.props
    const { name, email, pass } = this.state
    const user = get(userData, 'userByName', {})
    const orgUsers = get(user, 'organizationUsersByUserId.nodes', [])
    const pcs = get(user, 'propertyCollectionsByImportedBy.nodes', [])
    const saveDisabled =
      !pass &&
      (!(!!name && !!user.name && !!email && !!user.email) ||
        (name === user.name && email === user.email))

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
        <TextField
          floatingLabelText="Passwort"
          type="password"
          value={pass}
          onChange={this.onChangePass}
          fullWidth
        />
        <RaisedButton
          label="Änderungen speichern"
          onClick={this.onSave}
          disabled={saveDisabled}
        />
        {orgUsers.length > 0 && <Roles orgUsers={orgUsers} />}
        {pcs.length > 0 && <PCs pcs={pcs} />}
        <RaisedButton label="Neu anmelden" onClick={this.onLogout} />
      </Container>
    )
  }
}

export default enhance(User)
