// @flow
import React from 'react'
import { ReflexContainer, ReflexSplitter, ReflexElement } from 'react-reflex'

import Tree from './Tree'
import DataType from './DataType'

const Data = () => (
  <ReflexContainer orientation="vertical">
    <ReflexElement
      flex={0.35}
      className="tree-reflex-element"
      propagateDimensions={true}
      renderOnResizeRate={50}
      renderOnResize={true}
    >
      <Tree />
    </ReflexElement>
    <ReflexSplitter key="treeSplitter" />
    <ReflexElement>
      <DataType />
    </ReflexElement>
  </ReflexContainer>
)

export default Data
