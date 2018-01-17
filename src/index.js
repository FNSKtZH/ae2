import React from 'react'
import ReactDOM from 'react-dom'
import { ApolloClient } from 'apollo-client'
import { createHttpLink } from 'apollo-link-http'
import { setContext } from 'apollo-link-context'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { withClientState } from 'apollo-link-state'
import { ApolloProvider } from 'react-apollo'
import { ApolloLink } from 'apollo-link'
import get from 'lodash/get'
import jwtDecode from 'jwt-decode'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import { MuiThemeProvider as NewMuiThemeProvider } from 'material-ui-next/styles'
import Reboot from 'material-ui-next/Reboot'
import app from 'ampersand-app'
import createHistory from 'history/createBrowserHistory'

import myTheme from './styling/theme'
import myThemeV1 from './styling/themeV1'
import constants from './modules/constants'
import './index.css'
import 'react-reflex/styles.css'
import App from './components/App'
import registerServiceWorker from './registerServiceWorker'
import getActiveNodeArrayFromPathname from './modules/getActiveNodeArrayFromPathname'
import activeNodeArrayMutation from './modules/activeNodeArrayMutation'
import initializeIdb from './modules/initializeIdb'
import setLoginFromIdb from './modules/setLoginFromIdb'
import setLoginMutation from './modules/loginMutation'
import defaults from './store/defaults'
import resolvers from './store/resolvers'
;(async () => {
  try {
    const idb = initializeIdb()

    const authMiddleware = setContext(async () => {
      let users
      users = await idb.users.toArray()
      const token = get(users, '[0].token')
      if (token) {
        const tokenDecoded = jwtDecode(token)
        // for unknown reason, date.now returns three more after comma
        // numbers than the exp date contains
        const tokenIsValid = tokenDecoded.exp > Date.now() / 1000
        if (tokenIsValid) {
          return {
            headers: {
              authorization: `Bearer ${token}`,
            },
          }
        } else {
          // token is not valid any more > remove it
          idb.users.clear()
          client.mutate({
            mutation: setLoginMutation,
            variables: {
              username: 'Login abgelaufen',
              role: '',
              token: '',
            },
          })
          setTimeout(
            () =>
              client.mutate({
                mutation: setLoginMutation,
                variables: {
                  username: '',
                  role: '',
                  token: '',
                },
              }),
            10000
          )
        }
        // TODO: tell user "Ihre Anmeldung ist abgelaufen"
      }
    })

    const cache = new InMemoryCache()
    const stateLink = withClientState({
      resolvers,
      cache,
      defaults,
    })
    //console.log('index: stateLink:', stateLink)
    const hostnameWithoutWww = window.location.hostname.replace('www.', '')
    const isLocalhost = hostnameWithoutWww === 'localhost'
    const uri = isLocalhost
      ? 'http://localhost:5000/graphql'
      : `https://${window.location.hostname}/graphql`
    const httpLink = createHttpLink({
      uri,
    })
    const client = new ApolloClient({
      link: ApolloLink.from([stateLink, authMiddleware, httpLink]),
      cache,
    })

    // configure history
    const history = createHistory()
    // make ui follow when user uses browser back and forward buttons
    history.listen(location =>
      client.mutate({
        mutation: activeNodeArrayMutation,
        variables: {
          value: getActiveNodeArrayFromPathname(),
        },
      })
    )

    app.extend({
      init() {
        this.client = client
        this.history = history
        this.idb = idb
      },
    })
    app.init()
    // set login from idb
    setLoginFromIdb(client)
    // make app accessible in console
    window.app = app

    // initiate activeNodeArray
    let activeNodeArray = getActiveNodeArrayFromPathname()
    if (activeNodeArray.length === 0) {
      // forward / to /Taxonomien
      activeNodeArray = ['Taxonomien']
    }
    client.mutate({
      mutation: activeNodeArrayMutation,
      variables: {
        value: activeNodeArray,
      },
    })

    const theme = Object.assign({}, myTheme, {
      appBar: {
        height: constants.appBarHeight,
      },
    })

    const themeV1 = Object.assign({}, myThemeV1, {
      appBar: {
        height: constants.appBarHeight,
      },
    })

    ReactDOM.render(
      <ApolloProvider client={client}>
        <NewMuiThemeProvider mitTheme={themeV1}>
          <MuiThemeProvider muiTheme={getMuiTheme(theme)}>
            <Reboot />
            <App />
          </MuiThemeProvider>
        </NewMuiThemeProvider>
      </ApolloProvider>,
      document.getElementById('root')
    )

    registerServiceWorker()
  } catch (error) {
    console.log('Error in index.js: ', error)
  }
})()
