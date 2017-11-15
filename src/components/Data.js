// @flow
import React from 'react'
import { ReflexContainer, ReflexSplitter, ReflexElement } from 'react-reflex'
import { observer, inject } from 'mobx-react'
import { graphql } from 'react-apollo'
import compose from 'recompose/compose'

import Tree from './Tree'
import DataType from './DataType'
import activeNodeArrayGql from '../modules/activeNodeArrayGql'

const activeNodeArrayData = graphql(activeNodeArrayGql, {
  name: 'activeNodeArrayData',
})

const enhance = compose(inject('store'), activeNodeArrayData, observer)

const Data = ({
  store,
  data,
  activeNodeArrayData,
  activeObject,
}: {
  store: Object,
  data: Object,
  activeNodeArrayData: Object,
  activeObject: Object,
}) => {
  const activeNodeArray =
    activeNodeArrayData &&
    activeNodeArrayData.activeNodeArray &&
    activeNodeArrayData.activeNodeArray[0].value
      ? activeNodeArrayData.activeNodeArray[0].value
      : []

  return (
    <ReflexContainer orientation="vertical">
      <ReflexElement flex={0.35} className="tree-reflex-element">
        <Tree data={data} activeNodeArray={activeNodeArray} />
      </ReflexElement>
      <ReflexSplitter key="treeSplitter" />
      <ReflexElement>
        <DataType activeObject={activeObject} />
      </ReflexElement>
    </ReflexContainer>
  )
}

export default enhance(Data)
