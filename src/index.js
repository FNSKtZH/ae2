import React from 'react'
import ReactDOM from 'react-dom'
import { ApolloClient } from 'apollo-client'
import { createHttpLink } from 'apollo-link-http'
import { setContext } from 'apollo-link-context'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { ApolloProvider } from 'react-apollo'
import { ApolloLink } from 'apollo-link'
import get from 'lodash/get'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import app from 'ampersand-app'
import createHistory from 'history/createBrowserHistory'

import myTheme from './styling/theme'
import constants from './modules/constants'
import './index.css'
import 'react-reflex/styles.css'
import App from './components/App'
import registerServiceWorker from './registerServiceWorker'
import getActiveNodeArrayFromPathname from './modules/getActiveNodeArrayFromPathname'
import localStateLink from './localStateLink'
import activeNodeArrayMutation from './modules/activeNodeArrayMutation'
import initializeDb from './modules/initializeDb'
import setLoginFromIdb from './modules/setLoginFromIdb'
;(async () => {
  try {
    const idb = initializeDb()

    const authMiddleware = setContext(async () => {
      let users
      users = await idb.users.toArray()
      const token = get(users, '[0].token')
      if (token) {
        return {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      }
    })

    const httpLink = createHttpLink({ uri: 'http://localhost:5000/graphql' })
    const client = new ApolloClient({
      link: ApolloLink.from([localStateLink, authMiddleware, httpLink]),
      cache: new InMemoryCache(),
    })

    // configure history
    const history = createHistory()
    // make ui follow when user uses browser back and forward buttons
    history.listen(location =>
      client.mutate({
        mutation: activeNodeArrayMutation,
        variables: { value: getActiveNodeArrayFromPathname() },
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
      variables: { value: activeNodeArray },
    })

    const theme = Object.assign({}, myTheme, {
      appBar: {
        height: constants.appBarHeight,
      },
    })

    ReactDOM.render(
      <ApolloProvider client={client}>
        <MuiThemeProvider muiTheme={getMuiTheme(theme)}>
          <App />
        </MuiThemeProvider>
      </ApolloProvider>,
      document.getElementById('root')
    )

    registerServiceWorker()
  } catch (error) {
    console.log('Error in index.js: ', error)
  }
})()
