// @flow
import React, { Component } from 'react'
import { ReflexContainer, ReflexSplitter, ReflexElement } from 'react-reflex'
import styled from 'styled-components'
import { observer, inject } from 'mobx-react'
import compose from 'recompose/compose'

import AppBar from './AppBar'
import TreeChooser from './TreeChooser'
import Main from './Main'

const Container = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
`

const enhance = compose(inject('store'), observer)

class App extends Component {
  props: {
    store: Object,
    location: Object,
    history: Object,
  }

  render() {
    const { store } = this.props

    return (
      <Container>
        <AppBar />
        <ReflexContainer orientation="vertical">
          {store.ui.visibleColumns.tree &&
            <ReflexElement><TreeChooser /></ReflexElement>}
          {store.ui.visibleColumns.tree &&
            store.ui.visibleColumns.main &&
            <ReflexSplitter key="treeSplitter" />}
          {store.ui.visibleColumns.main &&
            <ReflexElement><Main /></ReflexElement>}
        </ReflexContainer>
      </Container>
    )
  }
}

export default enhance(App)
