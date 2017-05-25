// @flow
import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import myTtheme from './styling/theme'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import { Provider } from 'mobx-react'
import injectTapEventPlugin from 'react-tap-event-plugin'

import App from './components/App'
import registerServiceWorker from './registerServiceWorker'
import './index.css'
import 'react-reflex/styles.css'
import constants from './modules/constants'
import store from './store'

// Needed for onTouchTap and material-ui
// //stackoverflow.com/a/34015469/988941
injectTapEventPlugin()

const theme = Object.assign({}, myTtheme, {
  appBar: {
    height: constants.appBarHeight,
  },
})

ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <MuiThemeProvider muiTheme={getMuiTheme(theme)}><App /></MuiThemeProvider>
    </Provider>
  </BrowserRouter>,
  document.getElementById('root')
)
registerServiceWorker()
