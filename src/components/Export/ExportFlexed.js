// @flow
import React from 'react'
import { ReflexContainer, ReflexSplitter, ReflexElement } from 'react-reflex'

import ChooseColumn from './ChooseColumn'
import PreviewColumn from './PreviewColumn'
import ErrorBoundary from '../shared/ErrorBoundary'

const ExportFlexed = () => (
  <ReflexContainer orientation="vertical">
    <ReflexElement
      flex={0.5}
      className="tree-reflex-element"
      propagateDimensions={true}
      renderOnResizeRate={50}
      renderOnResize={true}
    >
      <ErrorBoundary>
        <ChooseColumn />
      </ErrorBoundary>
    </ReflexElement>
    <ReflexSplitter key="treeSplitter" />
    <ReflexElement>
      <ErrorBoundary>
        <PreviewColumn />
      </ErrorBoundary>
    </ReflexElement>
  </ReflexContainer>
)

export default ExportFlexed
