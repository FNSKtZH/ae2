import { createTheme } from '@mui/material/styles'
import { orange, green, red } from '@mui/material/colors'

import getConstants from './modules/constants'
const constants = getConstants()

// All the following keys are optional.
// We try our best to provide a great default value.
const theme = createTheme({
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
