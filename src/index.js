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
import App from './components/App'
import registerServiceWorker from './registerServiceWorker'
import getActiveNodeArrayFromPathname from './modules/getActiveNodeArrayFromPathname'
import localStateLink from './localStateLink'
import activeNodeArrayMutation from './modules/activeNodeArrayMutation'
import activeNodeArrayGql from './modules/activeNodeArrayGql'

const httpLink = createHttpLink({ uri: 'http://localhost:5000/graphql' })
const client = new ApolloClient({
  link: concat(localStateLink, httpLink),
  cache: new InMemoryCache({
    // need to add this to prevent errors in apollo, see:
    // https://github.com/apollographql/react-apollo/issues/741
    // but this could also CREATE issues... :-(
    addTypename: false,
  }),
})

/**
 * This is some localStateLink problem
 * need to query activeNodeArray or it will not exist
 * and provoke errors
 */
client.query({ query: activeNodeArrayGql })
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
      <App />
    </MuiThemeProvider>
  </ApolloProvider>,
  document.getElementById('root')
)

registerServiceWorker()
