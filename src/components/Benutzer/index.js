// @flow
import React, { Component } from 'react'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import styled from 'styled-components'
import compose from 'recompose/compose'
import { withApollo } from 'react-apollo'
import get from 'lodash/get'

import loginData from '../../modules/loginData'
import activeNodeArrayData from '../../modules/activeNodeArrayData'
import userData from './userData'
import treeData from '../Tree/treeData'
import Roles from './Roles'
import PCs from './PCs'
import TCs from './TCs'
import onSave from './onSave'

const Container = styled.form`
  padding: 10px;
`
const SaveButton = styled(RaisedButton)`
  margin-bottom: 15px;
`

const enhance = compose(
  withApollo,
  activeNodeArrayData,
  loginData,
  userData,
  treeData
)

type State = {
  name: string,
  nameErrorText: string,
  email: string,
  emailErrorText: string,
  pass: string,
  passErrorText: string,
  passNew: string,
}

type Props = {
  client: Object,
  loginData: Object,
  userData: Object,
  treeData: Object,
}

class User extends Component<Props, State> {
  state = {
    name: '',
    nameErrorText: '',
    emailErrorText: '',
    email: '',
    pass: '',
    passErrorText: 'Bitte Passwort eingeben, um Änderungen zu speichern',
    passNew: '',
  }

  componentDidUpdate(prevProps, prevState) {
    const propsUser = get(this.props.userData, 'userById', {})
    const prevPropsUser = get(prevProps.userData, 'userById', {})

    if (
      !!propsUser &&
      !!propsUser.id &&
      prevPropsUser &&
      (prevPropsUser.id === undefined || propsUser.id !== prevPropsUser.id)
    ) {
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

  onSave = () => {
    const props = this.props
    const state = this.state
    const setState = this.setState
    onSave({
      props,
      state,
      setState,
    }).then(() =>
      this.setState({
        nameErrorText: '',
        emailErrorText: '',
        passErrorText: '',
        pass: '',
      })
    )
  }

  render() {
    const { userData, loginData } = this.props
    const {
      name,
      nameErrorText,
      emailErrorText,
      email,
      pass,
      passErrorText,
      passNew,
    } = this.state
    const loginUsername = get(loginData, 'login.username')
    const user = get(userData, 'userById', {})
    const orgUsers = get(user, 'organizationUsersByUserId.nodes', [])
    const pcs = get(user, 'propertyCollectionsByImportedBy.nodes', [])
    const tcs = get(user, 'taxonomiesByImportedBy.nodes', [])
    const showPass =
      !userData.loading &&
      user &&
      ((name && name !== user.name) || (email && email !== user.email))
    const saveEnabled = !!pass && showPass
    const userIsLoggedIn =
      !!user && !!loginUsername && user.name === loginUsername

    return (
      <Container>
        <TextField
          name="name"
          floatingLabelText="Name"
          errorText={nameErrorText}
          value={name || ''}
          onChange={this.onChangeVal}
          fullWidth
          autoComplete="username"
        />
        <TextField
          name="email"
          floatingLabelText="Email"
          errorText={emailErrorText}
          value={email || ''}
          onChange={this.onChangeVal}
          fullWidth
          autoComplete="email"
        />
        {userIsLoggedIn && (
          <TextField
            name="passNew"
            floatingLabelText="Passwort ändern"
            type="password"
            value={passNew || ''}
            onChange={this.onChangeVal}
            fullWidth
            autoComplete="new-password"
          />
        )}
        {showPass && (
          <TextField
            name="pass"
            floatingLabelText="Passwort (aktuell)"
            errorText={passErrorText}
            errorStyle={{
              color: 'green',
            }}
            type="password"
            value={pass || ''}
            onChange={this.onChangeVal}
            fullWidth
            autoComplete="current-password"
          />
        )}
        <SaveButton
          label="Änderungen speichern"
          onClick={this.onSave}
          disabled={!saveEnabled}
        />
        {orgUsers.length > 0 && <Roles orgUsers={orgUsers} />}
        {pcs.length > 0 && <PCs pcs={pcs} />}
        {tcs.length > 0 && <TCs userData={userData} tcs={tcs} />}
      </Container>
    )
  }
}

export default enhance(User)
