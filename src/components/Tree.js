// @flow
import React from 'react'
// if observer is active, forceUpdate during rendering happens
import { graphql } from 'react-apollo'
import AutoSizer from 'react-virtualized/dist/commonjs/AutoSizer'
import List from 'react-virtualized/dist/commonjs/List'
import styled from 'styled-components'
import compose from 'recompose/compose'
import findIndex from 'lodash/findIndex'
import isEqual from 'lodash/isEqual'

import Row from './TreeRow'
import TreeFilter from './TreeFilter'
import buildNodesFromAppQuery from '../modules/buildNodesFromAppQuery'
import activeNodeArrayGql from '../modules/activeNodeArrayGql'
import allCategoriesData from '../modules/allCategoriesData'
import treeData from '../modules/treeData'

const singleRowHeight = 23
const Container = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  ul {
    margin: 0;
    list-style: none;
    padding: 0 0 0 1.1em;
  }
  .ReactVirtualized__Grid {
    /* try to prevent overflow shivering */
    overflow-x: hidden !important;
  }
  .ReactVirtualized__Grid:focus {
    outline-style: none;
  }
`
const AutoSizerContainer = styled.div`
  height: 100%;
  padding: 5px 0;
`
const ListContainer = styled(List)`
  font-size: 14px;
  font-weight: normal;
  * {
    box-sizing: border-box;
    font-size: 14px;
    font-weight: normal;
  }
  &:focus {
    outline-color: rgb(48, 48, 48) !important;
  }
`
const LoadingDiv = styled.div`
  padding-left: 15px;
  font-size: 14px;
`
const listContainerStyle = { padding: '5px' }

const activeNodeArrayData = graphql(activeNodeArrayGql, {
  name: 'activeNodeArrayData',
})

const noRowsRenderer = nodes => (
  <Container>
    <LoadingDiv>lade Daten...</LoadingDiv>
  </Container>
)

const enhance = compose(activeNodeArrayData, allCategoriesData, treeData)

const Tree = ({
  activeNodeArrayData,
  allCategoriesData,
  treeData,
  // dimensions is passed down from ReflexElement
  dimensions,
}: {
  activeNodeArrayData: Object,
  allCategoriesData: Object,
  treeData: Object,
  dimensions: Object,
}) => {
  const { activeNodeArray } = activeNodeArrayData
  const { error } = treeData
  const nodes = buildNodesFromAppQuery({
    treeData,
    allCategoriesData,
    activeNodeArray,
  })
  const rowRenderer = ({ key, index, style }) => (
    <Row key={key} index={index} style={style} nodes={nodes} />
  )
  const activeNodeIndex = findIndex(nodes, node =>
    isEqual(node.url, activeNodeArray)
  )
  if (error) {
    return <div> {error.message} </div>
  }

  return (
    <Container>
      <TreeFilter appData={treeData} dimensions={dimensions} />
      <AutoSizerContainer>
        <AutoSizer>
          {({ height, width }) => (
            <ListContainer
              height={height}
              rowCount={nodes.length}
              rowHeight={singleRowHeight}
              rowRenderer={rowRenderer}
              noRowsRenderer={noRowsRenderer}
              scrollToIndex={activeNodeIndex}
              width={width}
              style={listContainerStyle}
            />
          )}
        </AutoSizer>
      </AutoSizerContainer>
    </Container>
  )
}

export default enhance(Tree)
