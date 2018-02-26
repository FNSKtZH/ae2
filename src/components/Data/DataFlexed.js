// @flow
import React from 'react'
import { ReflexContainer, ReflexSplitter, ReflexElement } from 'react-reflex'
import styled from 'styled-components'

import Tree from '../Tree'
import DataType from '../DataType'
import ErrorBoundary from '../shared/ErrorBoundary'

const DataElement = styled(ReflexElement)`
  overflow-x: hidden !important;
  overflow-y: auto !important;
`

const DataFlexed = () => (
  <ErrorBoundary>
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
      <DataElement
        propagateDimensions={true}
        renderOnResizeRate={50}
        renderOnResize={true}
      >
        <DataType />
      </DataElement>
    </ReflexContainer>
  </ErrorBoundary>
)

export default DataFlexed
