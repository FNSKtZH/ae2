// @flow
import React from 'react'
import { ReflexContainer, ReflexSplitter, ReflexElement } from 'react-reflex'
import styled from 'styled-components'
import { observer, inject } from 'mobx-react'
import compose from 'recompose/compose'

import AppBar from './AppBar'
import Tree from './Tree'
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

const App = ({ store }: { store: Object }) =>
  <Container>
    <AppBar />
    <ReflexContainer orientation="vertical">
      {store.ui.visibleColumns.tree &&
        <ReflexElement flex={0.35}>
          <Tree activeNodeArray={store.activeNodeArray} nodes={store.nodes} />
        </ReflexElement>}
      {store.ui.visibleColumns.tree &&
        store.ui.visibleColumns.main &&
        <ReflexSplitter key="treeSplitter" />}
      {store.ui.visibleColumns.main &&
        <ReflexElement><Column><Main /></Column></ReflexElement>}
    </ReflexContainer>
  </Container>

export default enhance(App)
