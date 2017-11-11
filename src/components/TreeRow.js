// @flow
import React from 'react'
import { toJS } from 'mobx'
import { observer, inject } from 'mobx-react'
import styled from 'styled-components'
import compose from 'recompose/compose'
import { ContextMenuTrigger } from 'react-contextmenu'
import FontIcon from 'material-ui/FontIcon'
import isEqual from 'lodash/isEqual'
import clone from 'lodash/clone'
import gql from 'graphql-tag'

import isUrlInActiveNodePath from '../modules/isUrlInActiveNodePath'

const singleRowHeight = 23
const StyledNode = styled.div`
  padding-left: ${props => `${Number(props['data-level']) * 17 - 17}px`};
  height: ${singleRowHeight}px;
  max-height: ${singleRowHeight}px;
  box-sizing: border-box;
  margin: 0;
  display: flex;
  flex-direction: row;
  white-space: nowrap;
  user-select: none;
  cursor: pointer;
  color: ${props =>
    props['data-nodeisinactivenodepath'] ? '#D84315' : 'inherit'};
  &:hover {
    color: #f57c00 !important;
  }
`
const SymbolIcon = styled(FontIcon)`
  margin-top: ${props =>
    props['data-nodeisinactivenodepath']
      ? '-5px !important'
      : '-2px !important'};
  padding-left: ${props =>
    props['data-nodeisinactivenodepath'] ? '2px' : '2px'};
  font-size: ${props =>
    props['data-nodeisinactivenodepath']
      ? '26px !important'
      : '22px !important'};
  font-weight: ${props =>
    props['data-nodeisinactivenodepath'] ? '700 !important' : 'inherit'};
  color: ${props =>
    props['data-nodeisinactivenodepath'] ? '#D84315 !important' : 'inherit'};
  width: 26px;
  &:hover {
    color: #f57c00 !important;
  }
`
const SymbolSpan = styled.span`
  padding-right: 8px !important;
  padding-left: ${props =>
    props['data-nodeisinactivenodepath'] ? '8px' : '9px'};
  font-weight: ${props =>
    props['data-nodeisinactivenodepath'] ? '700 !important' : 'inherit'};
  margin-top: ${props =>
    props['data-nodeisinactivenodepath'] ? '-9px' : '-9px'};
  font-size: 28px !important;
  width: 26px;
`
const TextSpan = styled.span`
  margin-left: 0;
  font-size: 16px !important;
  font-weight: ${props =>
    props['data-nodeisinactivenodepath'] ? '700 !important' : 'inherit'};
`

const enhance = compose(inject('store'), observer)

const Row = ({
  key,
  index,
  style,
  store,
  nodes,
}: {
  key?: number,
  index: number,
  style: Object,
  store: Object,
  nodes: Array<Object>,
}) => {
  const node = nodes[index]
  const nodeIsInActiveNodePath = isUrlInActiveNodePath(
    toJS(node.url),
    toJS(store.activeNodeArray)
  )
  const onClickNode = event => {
    // do nothing when loading indicator is clicked
    if (!node.loadingNode) {
      const url = toJS(node.url)
      const activeNodeArray = toJS(store.activeNodeArray)
      // if active node is clicked, make it's parent active
      if (isEqual(url, activeNodeArray)) {
        const newUrl = clone(toJS(node.url))
        newUrl.pop()
        store.setActiveNodeArray(newUrl)
      } else {
        store.setActiveNodeArray(node.url)
      }
    }
  }
  const myProps = { key: index }
  // build symbols
  let useSymbolIcon = true
  let useSymbolSpan = false
  let symbolIcon
  if (node.childrenCount && nodeIsInActiveNodePath) {
    symbolIcon = 'expand_more'
  } else if (node.childrenCount) {
    symbolIcon = 'chevron_right'
  } else if (node.label === 'lade Daten') {
    symbolIcon = 'more_horiz'
  } else {
    useSymbolSpan = true
    useSymbolIcon = false
  }
  const dataUrl = JSON.stringify(node.url)
  const level = node.url.length

  return (
    <div key={key} style={style}>
      <ContextMenuTrigger
        id={node.id}
        collect={props => myProps}
        nodeId={node.id}
        nodeLabel={node.label}
        key={node.id}
      >
        <StyledNode
          data-level={level}
          data-nodeisinactivenodepath={nodeIsInActiveNodePath}
          data-id={node.id}
          data-parentid={node.parentId}
          data-url={dataUrl}
          data-nodetype={node.nodeType}
          data-label={node.label}
          data-menutype={node.menuType}
          onClick={onClickNode}
        >
          {useSymbolIcon && (
            <SymbolIcon
              id="symbol"
              data-nodeisinactivenodepath={nodeIsInActiveNodePath}
              className="material-icons"
            >
              {symbolIcon}
            </SymbolIcon>
          )}
          {useSymbolSpan && (
            <SymbolSpan data-nodeisinactivenodepath={nodeIsInActiveNodePath}>
              {'-'}
            </SymbolSpan>
          )}
          <TextSpan data-nodeisinactivenodepath={nodeIsInActiveNodePath}>
            {node.label}
          </TextSpan>
        </StyledNode>
      </ContextMenuTrigger>
    </div>
  )
}

Row.fragments = {
  objektLevel5AndUp: gql`
    fragment ObjektLevel5AndUp on Object {
      id
      objectsByParentId {
        nodes {
          id
          name
          objectsByParentId {
            totalCount
          }
        }
      }
    }
  `,
}

export default enhance(Row)
