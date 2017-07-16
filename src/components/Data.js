// @flow
import React from 'react'
import { ReflexContainer, ReflexSplitter, ReflexElement } from 'react-reflex'
// if observer is active, "lade daten..." remains forever
import { /*observer,*/ inject } from 'mobx-react'
import compose from 'recompose/compose'

import Tree from './Tree'
import DataType from './DataType'

const enhance = compose(inject('store') /*, observer*/)

const Data = ({
  store,
  activeObject,
}: {
  store: Object,
  activeObject: Object,
}) =>
  <ReflexContainer orientation="vertical">
    <ReflexElement flex={0.35} className="tree-reflex-element">
      <Tree activeNodeArray={store.activeNodeArray} />
    </ReflexElement>
    <ReflexSplitter key="treeSplitter" />
    <ReflexElement>
      <DataType activeObject={activeObject} />
    </ReflexElement>
  </ReflexContainer>

export default enhance(Data)
