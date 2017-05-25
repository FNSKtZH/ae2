// @flow
import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import { AutoSizer, List } from 'react-virtualized'
import styled from 'styled-components'
import compose from 'recompose/compose'
import { QueryRenderer, graphql } from 'react-relay'

import Row from './TreeRow'
import environment from '../modules/createRelayEnvironment'

const singleRowHeight = 23
const Container = styled.div`
  height: 100%;
  ul {
    margin: 0;
    list-style: none;
    padding: 0 0 0 1.1em;
  }
  /* need this because react-virtualized scrolls to far down, see
   * https://github.com/bvaughn/react-virtualized/issues/543
   */
  .ReactVirtualized__Grid {
    overflow-x: hidden !important;
  }
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
const tree = {
  name: 'tree',
  nodes: [
    {
      id: 1,
      menuType: 'topLevel',
      nodeType: 'dontKnow',
      url: [1],
      label: 'Taxonomien',
      hasChildren: true,
      parentId: null,
    },
    {
      id: 2,
      menuType: 'topLevel',
      nodeType: 'dontKnow',
      url: [2],
      label: 'Eigenschaften-Sammlungen',
      hasChildren: true,
      parentId: null,
    },
    {
      id: 3,
      menuType: 'topLevel',
      nodeType: 'dontKnow',
      url: [3],
      label: 'Beziehungs-Sammlungen',
      hasChildren: true,
      parentId: null,
    },
  ],
}
const enhance = compose(inject('store'), observer)

class TreeColumn extends Component {
  props: { store: Object }

  rowRenderer = ({ key, index, style }) => (
    <Row key={key} index={index} style={style} tree={tree} openNodes={[]} />
  )

  noRowsRenderer = () => (
    <Container>
      <LoadingDiv>
        {this.props.projektLoading ? 'lade Daten...' : 'keine Daten'}
      </LoadingDiv>
    </Container>
  )

  render() {
    return (
      <QueryRenderer
        environment={environment}
        query={graphql`
            query TaxonomyQuery {
              allCategories {
                nodes {
                  name
                }
              }
            }
          `}
        render={({ error, props }) => {
          console.log('props:', props)
          return (
            <Container>
              <AutoSizer>
                {({ height, width }) => (
                  <ListContainer
                    height={height}
                    rowCount={3}
                    rowHeight={singleRowHeight}
                    rowRenderer={this.rowRenderer}
                    noRowsRenderer={this.noRowsRenderer}
                    scrollToIndex={null}
                    width={width}
                  />
                )}
              </AutoSizer>
            </Container>
          )
        }}
      />
    )
  }
}

export default enhance(TreeColumn)
