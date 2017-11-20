import React from 'react'
import ReactDOM from 'react-dom'
import { ApolloClient } from 'apollo-client'
import { createHttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { ApolloProvider } from 'react-apollo'
import { concat } from 'apollo-link'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import app from 'ampersand-app'
import createHistory from 'history/createBrowserHistory'

import myTheme from './styling/theme'
import constants from './modules/constants'
import './index.css'
import 'react-reflex/styles.css'
import AppShell from './components/AppShell'
import registerServiceWorker from './registerServiceWorker'
import store from './store'
import getActiveNodeArrayFromPathname from './modules/getActiveNodeArrayFromPathname'
import localStateLink from './localStateLink'
import activeNodeArrayMutation from './modules/activeNodeArrayMutation'

const httpLink = createHttpLink({ uri: 'http://localhost:5000/graphql' })
const client = new ApolloClient({
  link: concat(localStateLink, httpLink),
  cache: new InMemoryCache(),
})

const history = createHistory()
/**
 * TODO
 * adapt this so it works
 * this is to make history work
 * when user uses browser back and forwards functions
 */
/*
window.document.onmouseover = () => {
  History.mouseIsInDoc = true
}
window.document.onmouseleave = () => {
  History.mouseIsInDoc = false
}
window.onpopstate = () => {
  if (!History.mouseIsInDoc) {
    History.location.pathname = window.document.location.pathname
    History.location.search = window.document.location.search
  }
}
*/

app.extend({
  init() {
    this.store = store
    this.client = client
    this.history = history
  },
})
app.init()
// make app accessible in console
window.app = app

// initiate activeNodeArray
let activeNodeArrayFromUrl = getActiveNodeArrayFromPathname()
if (activeNodeArrayFromUrl.length === 0) {
  // forward / to /Taxonomien
  activeNodeArrayFromUrl = ['Taxonomien']
}

client.mutate({
  mutation: activeNodeArrayMutation,
  variables: { value: activeNodeArrayFromUrl },
})

const theme = Object.assign({}, myTheme, {
  appBar: {
    height: constants.appBarHeight,
  },
})

ReactDOM.render(
  <ApolloProvider client={client}>
    <MuiThemeProvider muiTheme={getMuiTheme(theme)}>
      <AppShell />
    </MuiThemeProvider>
  </ApolloProvider>,
  document.getElementById('root')
)

registerServiceWorker()
