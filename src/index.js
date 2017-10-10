import React from 'react'
import ReactDOM from 'react-dom'
import {
  ApolloClient,
  createNetworkInterface,
  ApolloProvider,
} from 'react-apollo'
import { Provider } from 'mobx-react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import app from 'ampersand-app'

import myTtheme from './styling/theme'
import constants from './modules/constants'
import './index.css'
import 'react-reflex/styles.css'
import AppShell from './components/AppShell'
import registerServiceWorker from './registerServiceWorker'
import store from './store'
import getActiveNodeArrayFromPathname from './store/action/getActiveNodeArrayFromPathname'

const MobxProvider = Provider
app.extend({
  init() {
    this.store = store
  },
})
app.init()
// make app accessible in console
window.app = app

// initiate activeNodeArray
const activeNodeArrayFromUrl = getActiveNodeArrayFromPathname()
store.setActiveNodeArray(activeNodeArrayFromUrl)

const client = new ApolloClient({
  networkInterface: createNetworkInterface({
    uri: 'http://localhost:5000/graphql',
  }),
})
const theme = Object.assign({}, myTtheme, {
  appBar: {
    height: constants.appBarHeight,
  },
})

ReactDOM.render(
  <MobxProvider store={store}>
    <ApolloProvider client={client}>
      <MuiThemeProvider muiTheme={getMuiTheme(theme)}>
        <AppShell />
      </MuiThemeProvider>
    </ApolloProvider>
  </MobxProvider>,
  document.getElementById('root')
)
registerServiceWorker()
