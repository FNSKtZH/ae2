// @flow
import React from 'react'
import { ReflexContainer, ReflexSplitter, ReflexElement } from 'react-reflex'
import { observer, inject } from 'mobx-react'
import compose from 'recompose/compose'

import Tree from './Tree'
import DataType from './DataType'

const enhance = compose(inject('store'), observer)

const Data = ({
  store,
  data,
  activeObject,
  filterSuggestionsTO,
  filterSuggestionsPC,
}: {
  store: Object,
  data: Object,
  activeObject: Object,
  filterSuggestionsTO: Object,
  filterSuggestionsPC: Object,
}) => (
  <ReflexContainer orientation="vertical">
    <ReflexElement flex={0.35} className="tree-reflex-element">
      <Tree
        data={data}
        activeNodeArray={store.activeNodeArray}
        filterSuggestionsTO={filterSuggestionsTO}
        filterSuggestionsPC={filterSuggestionsPC}
      />
    </ReflexElement>
    <ReflexSplitter key="treeSplitter" />
    <ReflexElement>
      <DataType activeObject={activeObject} />
    </ReflexElement>
  </ReflexContainer>
)

export default enhance(Data)
