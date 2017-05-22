// @flow
import React from 'react'
import ReactDOM from 'react-dom'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import injectTapEventPlugin from 'react-tap-event-plugin'

import App from './components/App'
import registerServiceWorker from './registerServiceWorker'
import './index.css'

// Needed for onTouchTap and material-ui
// //stackoverflow.com/a/34015469/988941
injectTapEventPlugin()

const theme = Object.assign({}, lightBaseTheme, {
  appBar: {
    height: 51,
  },
})

ReactDOM.render(
  <MuiThemeProvider muiTheme={getMuiTheme(theme)}><App /></MuiThemeProvider>,
  document.getElementById('root'),
)
registerServiceWorker()
