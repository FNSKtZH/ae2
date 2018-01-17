// @flow
import React, { Component } from 'react'
import TextField from 'material-ui/TextField'
import Button from 'material-ui-next/Button'
import { Tabs, Tab } from 'material-ui/Tabs'
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
import updateUserMutation from './updateUserMutation'
import updateUserMutationWithPass from './updateUserMutationWithPass'

const Container = styled.div``
const OrgContainer = styled.div`
  padding: 10px;
`
const SaveButton = styled(Button)`
  margin-bottom: 15px;
`
const StyledTabs = styled(Tabs)`
  > div {
    background-color: transparent !important;
    > button {
      color: grey !important;
    }
  }
`
const tabButtonStyle = { whiteSpace: 'normal' }
const tabInkBarStyle = { backgroundColor: 'rgb(230, 81, 0)' }

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

  onSave = async () => {
    const { name: username, email, passNew } = this.state
    const { userData, treeData, client } = this.props
    const id = get(userData, 'userById.id')
    const variables = passNew
      ? {
          username,
          email,
          id,
          pass: passNew,
        }
      : {
          username,
          email,
          id,
        }
    const mutation = passNew ? updateUserMutationWithPass : updateUserMutation
    try {
      await client.mutate({
        mutation,
        variables,
      })
    } catch (error) {
      const messages = error.graphQLErrors.map(x => x.message).toString()
      const isProperEmailError = messages.includes('proper_email')
      if (isProperEmailError) {
        const message = 'Email ist nicht gültig'
        return this.setState({
          emailErrorText: message,
        })
      }
      return console.log(error)
    }
    // refetch to update
    userData.refetch()
    treeData.refetch()
    this.setState({
      nameErrorText: '',
      emailErrorText: '',
      passNew: '',
    })
  }

  render() {
    const { userData, loginData } = this.props
    const { name, nameErrorText, emailErrorText, email, passNew } = this.state
    const loginUsername = get(loginData, 'login.username')
    const user = get(userData, 'userById', {})
    const orgUsers = get(user, 'organizationUsersByUserId.nodes', [])
    const pcs = get(user, 'propertyCollectionsByImportedBy.nodes', [])
    const tcs = get(user, 'taxonomiesByImportedBy.nodes', [])
    const saveEnabled =
      !userData.loading &&
      (passNew ||
        ((!!name && !!userData && !!user && name !== user.name) ||
          (!!email && !!userData && !!user && email !== user.email)))
    const userIsLoggedIn =
      !!user && !!loginUsername && user.name === loginUsername

    return (
      <Container>
        <OrgContainer>
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
          <SaveButton raised onClick={this.onSave} disabled={!saveEnabled}>
            Änderungen speichern
          </SaveButton>
        </OrgContainer>
        <StyledTabs inkBarStyle={tabInkBarStyle}>
          <Tab
            label={`Rollen (${orgUsers.length})`}
            buttonStyle={tabButtonStyle}
          >
            <Roles orgUsers={orgUsers} />
          </Tab>
          <Tab
            label={`importierte Taxonomien (${tcs.length})`}
            buttonStyle={tabButtonStyle}
          >
            <TCs userData={userData} tcs={tcs} />
          </Tab>
          <Tab
            label={`importierte Eigenschaften-Sammlungen (${pcs.length})`}
            buttonStyle={tabButtonStyle}
          >
            <PCs pcs={pcs} />
          </Tab>
        </StyledTabs>
      </Container>
    )
  }
}

export default enhance(User)
