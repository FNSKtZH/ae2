// @flow
import React from 'react'
import { ReflexContainer, ReflexSplitter, ReflexElement } from 'react-reflex'
import { /*observer,*/ inject } from 'mobx-react'
import compose from 'recompose/compose'

import Tree from './Tree'
import Main from './Main'

const enhance = compose(inject('store') /*, observer*/)

const Data = ({ store, nodes }: { store: Object, nodes: Array<Object> }) =>
  <ReflexContainer orientation="vertical">
    {store.ui.visibleColumns.tree &&
      <ReflexElement flex={0.35}>
        <Tree activeNodeArray={store.activeNodeArray} nodes={nodes} />
      </ReflexElement>}
    {store.ui.visibleColumns.tree &&
      store.ui.visibleColumns.main &&
      <ReflexSplitter key="treeSplitter" />}
    {store.ui.visibleColumns.main && <ReflexElement><Main /></ReflexElement>}
  </ReflexContainer>

export default enhance(Data)
