// @flow
import React from 'react'
import ReactDOM from 'react-dom'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import myTtheme from './styling/theme'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import { Provider } from 'mobx-react'
import injectTapEventPlugin from 'react-tap-event-plugin'
import app from 'ampersand-app'

import AppQuery from './components/AppQuery'
import registerServiceWorker from './registerServiceWorker'
import './index.css'
import 'react-reflex/styles.css'
import constants from './modules/constants'
import store from './store'
import getActiveNodeArrayFromPathname from './store/action/getActiveNodeArrayFromPathname'
import environment from './modules/createRelayEnvironment'

// Needed for onTouchTap and material-ui
// //stackoverflow.com/a/34015469/988941
injectTapEventPlugin()

app.extend({
  init() {
    this.environment = environment
    this.store = store
  },
})
app.init()
// make app accessible in console
window.app = app

// initiate activeNodeArray
const activeNodeArrayFromUrl = getActiveNodeArrayFromPathname()
store.setActiveNodeArray(activeNodeArrayFromUrl)

const theme = Object.assign({}, myTtheme, {
  appBar: {
    height: constants.appBarHeight,
  },
})

ReactDOM.render(
  <Provider store={store}>
    <MuiThemeProvider muiTheme={getMuiTheme(theme)}>
      <AppQuery />
    </MuiThemeProvider>
  </Provider>,
  document.getElementById('root')
)
registerServiceWorker()
