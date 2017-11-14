// @flow
import React from 'react'
import { ReflexContainer, ReflexSplitter, ReflexElement } from 'react-reflex'
import { observer, inject } from 'mobx-react'
import compose from 'recompose/compose'

import Tree from './Tree'
import DataType from './DataType'
import getActiveNodeArray from '../modules/getActiveNodeArray'

const enhance = compose(inject('store'), observer)

const Data = ({
  store,
  data,
  activeObject,
}: {
  store: Object,
  data: Object,
  activeObject: Object,
}) => (
  <ReflexContainer orientation="vertical">
    <ReflexElement flex={0.35} className="tree-reflex-element">
      <Tree data={data} activeNodeArray={getActiveNodeArray()} />
    </ReflexElement>
    <ReflexSplitter key="treeSplitter" />
    <ReflexElement>
      <DataType activeObject={activeObject} />
    </ReflexElement>
  </ReflexContainer>
)

export default enhance(Data)
