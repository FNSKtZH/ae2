import { createMuiTheme } from 'material-ui/styles'
import orange from 'material-ui/colors/orange'
import green from 'material-ui/colors/green'
import red from 'material-ui/colors/red'

import constants from './modules/constants'

// All the following keys are optional.
// We try our best to provide a great default value.
const theme = createMuiTheme({
  palette: {
    contrastThreshold: 3,
    tonalOffset: 0.2,
    primary: orange,
    secondary: green,
    error: {
      main: red[500],
    },
  },
  background: {
    default: '#fff9f1',
  },
  appBar: {
    height: constants.appBarHeight,
  },
})

export default theme
