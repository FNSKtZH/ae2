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
                activeDataType={store.tree.activeDataType}
                activeCategory={store.tree.activeCategory}
                activeTaxonomy={store.tree.activeTaxonomy}
                activeLevel3={store.tree.activeLevel3}
                activeLevel4={store.tree.activeLevel4}
                activeLevel5={store.tree.activeLevel5}
                activeLevel6={store.tree.activeLevel6}
                activeLevel7={store.tree.activeLevel7}
                activeLevel8={store.tree.activeLevel8}
                activeLevel9={store.tree.activeLevel9}
                activeLevel10={store.tree.activeLevel10}
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
