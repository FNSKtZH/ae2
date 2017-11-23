// @flow
import React from 'react'
import { ReflexContainer, ReflexSplitter, ReflexElement } from 'react-reflex'
import { graphql } from 'react-apollo'
import compose from 'recompose/compose'

import Tree from './Tree'
import DataType from './DataType'
import activeNodeArrayGql from '../modules/activeNodeArrayGql'

const activeNodeArrayData = graphql(activeNodeArrayGql, {
  name: 'activeNodeArrayData',
})

const enhance = compose(activeNodeArrayData)

const Data = ({
  data,
  activeNodeArrayData,
}: {
  data: Object,
  activeNodeArrayData: Object,
}) => {
  const { activeNodeArray } = activeNodeArrayData

  return (
    <ReflexContainer orientation="vertical">
      <ReflexElement
        flex={0.35}
        className="tree-reflex-element"
        propagateDimensions={true}
        renderOnResizeRate={50}
        renderOnResize={true}
      >
        <Tree data={data} activeNodeArray={activeNodeArray} />
      </ReflexElement>
      <ReflexSplitter key="treeSplitter" />
      <ReflexElement>
        <DataType />
      </ReflexElement>
    </ReflexContainer>
  )
}

export default enhance(Data)
