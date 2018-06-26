// @flow
import React, { Component } from 'react'
import TextField from '@material-ui/core/TextField'
import FormHelperText from '@material-ui/core/FormHelperText'
import FormControl from '@material-ui/core/FormControl'
import Button from '@material-ui/core/Button'
import Paper from '@material-ui/core/Paper'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import styled from 'styled-components'
import compose from 'recompose/compose'
import withState from 'recompose/withState'
import withHandlers from 'recompose/withHandlers'
import { withApollo } from 'react-apollo'
import get from 'lodash/get'

import activeNodeArrayData from '../../modules/activeNodeArrayData'
import fetchData from './data'
import treeData from '../Tree/treeData'
import Roles from './Roles'
import PCs from './PCs'
import TCs from './TCs'
import updateUserMutation from './updateUserMutation'
import updateUserMutationWithPass from './updateUserMutationWithPass'
import ErrorBoundary from '../shared/ErrorBoundary'

const Container = styled.div``
const OrgContainer = styled.div`
  padding: 10px;
`
const SaveButton = styled(Button)`
  border: 1px solid !important;
  margin-top: 10px !important;
`
const StyledPaper = styled(Paper)`
  background-color: #ffcc80 !important;
`

const enhance = compose(
  withApollo,
  withState('tab', 'setTab', 0),
  withHandlers({
    onChangeTab: ({ setTab }) => (event, value) => {
      setTab(value)
    },
  }),
  activeNodeArrayData,
  fetchData,
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
  data: Object,
  treeData: Object,
  tab: Number,
  setTab: () => void,
  onChangeTab: () => void,
  dimensions: Object,
}

class User extends Component<Props, State> {
  constructor(props) {
    super(props)
    const user = get(props.data, 'userById', {})
    this.state = {
      name: user.name,
      nameErrorText: '',
      email: user.email,
      emailErrorText: '',
      passNew: '',
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const propsUser = get(this.props.data, 'userById', {})
    const prevPropsUser = get(prevProps.data, 'userById', {})

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

  onChangeVal = event => {
    const { name, value } = event.target
    this.setState({
      [name]: value,
    })
  }

  onSave = async () => {
    const { name: username, email, passNew } = this.state
    const { data, treeData, client } = this.props
    const id = get(data, 'userById.id')
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
    data.refetch()
    treeData.refetch()
    this.setState({
      nameErrorText: '',
      emailErrorText: '',
      passNew: '',
    })
  }

  render() {
    const {
      data,
      tab,
      onChangeTab,
      dimensions: { width },
    } = this.props
    const { name, nameErrorText, emailErrorText, email, passNew } = this.state
    const loginUsername = get(data, 'login.username')
    const user = get(data, 'userById', {})
    const orgUsers = get(user, 'organizationUsersByUserId.nodes', [])
    const pcs = get(user, 'propertyCollectionsByImportedBy.nodes', [])
    const tcs = get(user, 'taxonomiesByImportedBy.nodes', [])
    const saveEnabled =
      !data.loading &&
      (passNew ||
        ((!!name && !!data && !!user && name !== user.name) ||
          (!!email && !!data && !!user && email !== user.email)))
    const userIsLoggedIn =
      !!user && !!loginUsername && user.name === loginUsername

    return (
      <ErrorBoundary>
        <Container>
          <OrgContainer>
            <FormControl
              fullWidth
              error={!!nameErrorText}
              aria-describedby="name-error-text"
            >
              <TextField
                name="name"
                label="Name"
                value={name || ''}
                onChange={this.onChangeVal}
                fullWidth
                autoComplete="username"
              />
              <FormHelperText id="name-error-text">
                {nameErrorText}
              </FormHelperText>
            </FormControl>
            <FormControl
              fullWidth
              error={!!emailErrorText}
              aria-describedby="email-error-text"
            >
              <TextField
                name="email"
                label="Email"
                value={email || ''}
                onChange={this.onChangeVal}
                fullWidth
                autoComplete="email"
              />
              <FormHelperText id="email-error-text">
                {emailErrorText}
              </FormHelperText>
            </FormControl>
            {userIsLoggedIn && (
              <FormControl fullWidth>
                <TextField
                  name="passNew"
                  label="Passwort ändern"
                  type="password"
                  value={passNew || ''}
                  onChange={this.onChangeVal}
                  fullWidth
                  autoComplete="new-password"
                />
              </FormControl>
            )}
            <SaveButton onClick={this.onSave} disabled={!saveEnabled}>
              Änderungen speichern
            </SaveButton>
          </OrgContainer>
          <StyledPaper>
            <Tabs
              centered={width > 779}
              value={tab}
              onChange={onChangeTab}
              indicatorColor="primary"
              scrollable={width <= 779}
              scrollButtons="auto"
            >
              <Tab label={`Rollen (${orgUsers.length})`} />
              <Tab label={`importierte Taxonomien (${tcs.length})`} />
              <Tab
                label={`importierte Eigenschaften-Sammlungen (${pcs.length})`}
              />
            </Tabs>
          </StyledPaper>
          {tab === 0 && <Roles orgUsers={orgUsers} />}
          {tab === 1 && <TCs tcs={tcs} />}
          {tab === 2 && <PCs pcs={pcs} />}
        </Container>
      </ErrorBoundary>
    )
  }
}

export default enhance(User)
