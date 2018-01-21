// @flow
import React from 'react'
import { ReflexContainer, ReflexSplitter, ReflexElement } from 'react-reflex'
import styled from 'styled-components'

import ChooseColumn from './ChooseColumn'
import PreviewColumn from './PreviewColumn'
import ErrorBoundary from '../shared/ErrorBoundary'

const StyledReflexContainer = styled(ReflexContainer)`
  .reflex-element {
    overflow-x: hidden !important;
    overflow-y: auto !important;
  }
`

const Export = () => (
  <StyledReflexContainer orientation="vertical">
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
  </StyledReflexContainer>
)

export default Export
