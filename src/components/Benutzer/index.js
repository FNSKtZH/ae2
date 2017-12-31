// @flow
import React, { Component } from 'react'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import styled from 'styled-components'
import compose from 'recompose/compose'
import { withApollo } from 'react-apollo'
import app from 'ampersand-app'
import get from 'lodash/get'

import setLoginMutation from '../../modules/loginMutation'
import loginData from '../../modules/loginData'
import userData from './userData'
import Roles from './Roles'
import PCs from './PCs'
import onSave from './onSave'

const Container = styled.div`
  padding: 10px;
`
const SaveButton = styled(RaisedButton)`
  margin-bottom: 15px;
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
      passErrorText: 'Bitte Passwort eingeben, um Änderungen zu speichern',
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

  onSave = () => {
    const props = this.props
    const state = this.state

    onSave({ props, state }).then(() => {
      this.setState({
        nameErrorText: null,
        passErrorText: null,
        pass: '',
      })
      // need to refetch so pass disappears
      this.props.userData.refetch()
    })
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
        <RaisedButton label="abmelden" onClick={this.onLogout} />{' '}
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
            errorStyle={{ color: 'green' }}
            type="password"
            value={pass}
            onChange={this.onChangeVal}
            fullWidth
          />
        )}{' '}
        <SaveButton
          label="Änderungen speichern"
          onClick={this.onSave}
          disabled={!saveEnabled}
        />{' '}
        {orgUsers.length > 0 && <Roles orgUsers={orgUsers} />}{' '}
        {pcs.length > 0 && <PCs pcs={pcs} />}{' '}
      </Container>
    )
  }
}

export default enhance(User)
