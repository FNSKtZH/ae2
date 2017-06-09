// @flow
import React, { Component } from 'react'
import { ReflexContainer, ReflexSplitter, ReflexElement } from 'react-reflex'
import styled from 'styled-components'
import { observer, inject } from 'mobx-react'
import compose from 'recompose/compose'

import AppBar from './AppBar'
import TreeLevel1 from './TreeLevel1'
import Main from './Main'

const Container = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
`
const Column = styled.div`
  padding: 5px;
  height: 100%;
`

const enhance = compose(inject('store'), observer)

class App extends Component {
  props: {
    store: Object,
  }

  render() {
    const { store } = this.props

    return (
      <Container>
        <AppBar />
        <ReflexContainer orientation="vertical">
          {store.ui.visibleColumns.tree &&
            <ReflexElement flex={0.35}>
              <TreeLevel1
                activeNodeArray={store.activeNodeArray}
                activeLevel1={store.tree.activeLevel1}
                activeLevel2Taxonomy={store.tree.activeLevel2Taxonomy}
                activeLevel3Taxonomy={store.tree.activeLevel3Taxonomy}
                activeLevel4Taxonomy={store.tree.activeLevel4Taxonomy}
                activeLevel5Taxonomy={store.tree.activeLevel5Taxonomy}
                activeLevel6Taxonomy={store.tree.activeLevel6Taxonomy}
                activeLevel7Taxonomy={store.tree.activeLevel7Taxonomy}
                activeLevel8Taxonomy={store.tree.activeLevel8Taxonomy}
                activeLevel9Taxonomy={store.tree.activeLevel9Taxonomy}
                activeLevel10Taxonomy={store.tree.activeLevel10Taxonomy}
              />
            </ReflexElement>}
          {store.ui.visibleColumns.tree &&
            store.ui.visibleColumns.main &&
            <ReflexSplitter key="treeSplitter" />}
          {store.ui.visibleColumns.main &&
            <ReflexElement><Column><Main /></Column></ReflexElement>}
        </ReflexContainer>
      </Container>
    )
  }
}

export default enhance(App)
