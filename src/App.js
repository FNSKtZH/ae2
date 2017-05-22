import React, { Component } from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import styled from 'styled-components'

import './index.css'

class App extends Component {
  render() {
    return (
      <MuiThemeProvider>
        <h2>Welcome to arteigenschaften</h2>
      </MuiThemeProvider>
    )
  }
}

export default App
