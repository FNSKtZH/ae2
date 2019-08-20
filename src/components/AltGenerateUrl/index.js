import React from 'react'
import { ReflexContainer, ReflexSplitter, ReflexElement } from 'react-reflex'

import ChooseColumn from './ChooseColumn'
import PreviewColumn from './PreviewColumn'

const AltGenerateUrl = () => (
  <ReflexContainer orientation="vertical">
    <ReflexElement
      flex={0.5}
      className="tree-reflex-element"
      propagateDimensions={true}
      renderOnResizeRate={50}
      renderOnResize={true}
    >
      <ChooseColumn />
    </ReflexElement>
    <ReflexSplitter key="treeSplitter" />
    <ReflexElement>
      <PreviewColumn />
    </ReflexElement>
  </ReflexContainer>
)

export default AltGenerateUrl
