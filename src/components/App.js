// @flow
import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { ReflexContainer, ReflexSplitter, ReflexElement } from 'react-reflex'
import styled from 'styled-components'

import AppBar from './AppBar'
import TreeColumn from './TreeColumn'
import Main from './Main'

const Container = styled.div`
  height: 100%;
`

class App extends Component {
  componentWillMount() {
    const { location, history } = this.props
    if (location.pathname === '/') {
      history.push('/Taxonomien')
    }
  }

  render() {
    return (
      <Container>
        <AppBar />
        <ReflexContainer orientation="vertical">
          <ReflexElement><TreeColumn /></ReflexElement>
          <ReflexSplitter key="treeSplitter" />
          <ReflexElement><Main /></ReflexElement>
        </ReflexContainer>
      </Container>
    )
  }
}

export default withRouter(App)
