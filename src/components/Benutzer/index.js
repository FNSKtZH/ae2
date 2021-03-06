import React, { useEffect, useState, useCallback, useContext } from 'react'
import TextField from '@material-ui/core/TextField'
import FormHelperText from '@material-ui/core/FormHelperText'
import FormControl from '@material-ui/core/FormControl'
import Button from '@material-ui/core/Button'
import Paper from '@material-ui/core/Paper'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import styled from 'styled-components'
import get from 'lodash/get'
import { useQuery, useApolloClient } from '@apollo/client'
import { observer } from 'mobx-react-lite'
import { getSnapshot } from 'mobx-state-tree'

import query from './query'
import treeQuery from '../Tree/treeQuery'
import getTreeDataVariables from '../Tree/treeQueryVariables'
import Roles from './Roles'
import PCs from './PCs'
import TCs from './TCs'
import updateUserMutation from './updateUserMutation'
import updateUserMutationWithPass from './updateUserMutationWithPass'
import mobxStoreContext from '../../mobxStoreContext'
import Spinner from '../shared/Spinner'
import ErrorBoundary from '../shared/ErrorBoundary'

const Container = styled.div``
const LEContainer = styled.div`
  padding: 10px;
`
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

const User = () => {
  const client = useApolloClient()
  const mobxStore = useContext(mobxStoreContext)
  const { login } = mobxStore
  const activeNodeArray = getSnapshot(mobxStore.activeNodeArray)

  const { refetch: treeDataRefetch } = useQuery(treeQuery, {
    variables: getTreeDataVariables({ activeNodeArray }),
  })
  const {
    data,
    error: dataError,
    loading: dataLoading,
    refetch: dataRefetch,
  } = useQuery(query, {
    variables: {
      id: activeNodeArray[1] || '99999999-9999-9999-9999-999999999999',
    },
  })
  const user = get(data, 'userById', {})

  const [name, setName] = useState(user?.name)
  const [nameErrorText, setNameErrorText] = useState('')
  const [email, setEmail] = useState(user?.email)
  const [emailErrorText, setEmailErrorText] = useState('')
  const [passNew, setPassNew] = useState('')
  const [tab, setTab] = useState(0)

  const id = user?.id
  const orgUsers = user?.organizationUsersByUserId?.nodes ?? []
  const pcs = user?.propertyCollectionsByImportedBy?.nodes ?? []
  const tcs = user?.taxonomiesByImportedBy?.nodes ?? []
  const saveEnabled =
    !dataLoading &&
    (passNew ||
      (!!name && !!data && !!user && name !== user?.name) ||
      (!!email && !!data && !!user && email !== user?.email))
  const userIsLoggedIn =
    !!user && !!login.username && user?.name === login.username

  useEffect(() => {
    setName(user?.name)
    setEmail(user?.email)
  }, [user])
  const onChangeTab = useCallback((event, value) => setTab(value), [])
  const onChangeName = useCallback((e) => setName(e.target.value), [])
  const onChangeEmail = useCallback((e) => setEmail(e.target.value), [])
  const onChangePassNew = useCallback((e) => setPassNew(e.target.value), [])

  const onSave = useCallback(async () => {
    const variables = passNew
      ? {
          username: name,
          email,
          id,
          pass: passNew,
        }
      : {
          username: name,
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
      const messages = error.graphQLErrors.map((x) => x.message).toString()
      const isProperEmailError = messages.includes('proper_email')
      if (isProperEmailError) {
        const message = 'Email ist nicht gültig'
        return setEmailErrorText(message)
      }
      return console.log(error)
    }
    // refetch to update
    dataRefetch()
    treeDataRefetch()
    setNameErrorText('')
    setEmailErrorText('')
    setPassNew('')
  }, [passNew, name, email, id, dataRefetch, treeDataRefetch, client])

  if (dataLoading) {
    return <Spinner />
  }
  if (dataError) {
    return (
      <LEContainer>
        `Fehler beim Laden der Daten: ${dataError.message}`
      </LEContainer>
    )
  }

  if (!user) return null

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
              onChange={onChangeName}
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
              onChange={onChangeEmail}
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
                onChange={onChangePassNew}
                fullWidth
                autoComplete="new-password"
              />
            </FormControl>
          )}
          <SaveButton onClick={onSave} disabled={!saveEnabled}>
            Änderungen speichern
          </SaveButton>
        </OrgContainer>
        <StyledPaper>
          <Tabs
            variant="fullWidth"
            value={tab}
            onChange={onChangeTab}
            indicatorColor="primary"
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

export default observer(User)
