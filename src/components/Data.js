// @flow
import React from 'react'
import { ReflexContainer, ReflexSplitter, ReflexElement } from 'react-reflex'
import { /*observer,*/ inject } from 'mobx-react'
import compose from 'recompose/compose'

import Tree from './Tree'
import DataType from './DataType'

const enhance = compose(inject('store') /*, observer*/)

const Data = ({ store, nodes }: { store: Object, nodes: Array<Object> }) =>
  <ReflexContainer orientation="vertical">
    <ReflexElement flex={0.35} className="tree-reflex-element">
      <Tree activeNodeArray={store.activeNodeArray} nodes={nodes} />
    </ReflexElement>
    <ReflexSplitter key="treeSplitter" />
    <ReflexElement><DataType /></ReflexElement>
  </ReflexContainer>

export default enhance(Data)
