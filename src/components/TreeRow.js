// @flow
import React from 'react'
import { toJS } from 'mobx'
import { /*observer,*/ inject } from 'mobx-react'
import styled from 'styled-components'
import compose from 'recompose/compose'
import { ContextMenuTrigger } from 'react-contextmenu'
import FontIcon from 'material-ui/FontIcon'
import isEqual from 'lodash/isEqual'
import clone from 'lodash/clone'

import isUrlInActiveNodePath from '../modules/isUrlInActiveNodePath'

const singleRowHeight = 23
const StyledNode = styled(
  ({ level, nodeIsInActiveNodePath, children, ...rest }) =>
    <div {...rest}>{children}</div>
)`
  padding-left: ${props => `${Number(props.level) * 17 - 17}px`};
  height: ${singleRowHeight}px;
  max-height: ${singleRowHeight}px;
  box-sizing: border-box;
  margin: 0;
  display: flex;
  flex-direction: row;
  white-space: nowrap;
  user-select: none;
  cursor: pointer;
  color: ${props => (props.nodeIsInActiveNodePath ? '#D84315' : 'inherit')};
  &:hover {
    color: #F57C00 !important;
  }
`
const SymbolIcon = styled(
  ({ nodeIsInActiveNodePath, node, children, ...rest }) =>
    <FontIcon {...rest}>{children}</FontIcon>
)`
  margin-top: ${({ nodeIsInActiveNodePath }) =>
    nodeIsInActiveNodePath ? '-5px !important' : '-2px !important'};
  padding-left: ${({ nodeIsInActiveNodePath }) =>
    nodeIsInActiveNodePath ? '2px' : '2px'};
  font-size: ${({ nodeIsInActiveNodePath }) =>
    nodeIsInActiveNodePath ? '26px !important' : '22px !important'};
  font-weight: ${({ nodeIsInActiveNodePath }) =>
    nodeIsInActiveNodePath ? '700 !important' : 'inherit'};
  color: ${({ nodeIsInActiveNodePath }) =>
    nodeIsInActiveNodePath ? '#D84315 !important' : 'inherit'};
  width: 26px;
  &:hover {
    color: #F57C00 !important;
  }
`
const SymbolSpan = styled(({ nodeIsInActiveNodePath, children, ...rest }) =>
  <span {...rest}>{children}</span>
)`
  padding-right: 8px !important;
  padding-left: ${props => (props.nodeIsInActiveNodePath ? '8px' : '9px')};
  font-weight: ${props =>
    props.nodeIsInActiveNodePath ? '700 !important' : 'inherit'};
  margin-top: ${props => (props.nodeIsInActiveNodePath ? '-9px' : '-9px')};
  font-size: 28px !important;
  width: 26px;
`
const TextSpan = styled(({ nodeIsInActiveNodePath, children, ...rest }) =>
  <span {...rest}>{children}</span>
)`
  margin-left: 0;
  font-size: 16px !important;
  font-weight: ${props =>
    props.nodeIsInActiveNodePath ? '700 !important' : 'inherit'};
`

const enhance = compose(inject('store') /*, observer*/)

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
      // if active node is clicked, make it's parent active
      if (isEqual(toJS(node.url), toJS(store.activeNodeArray))) {
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
          level={level}
          nodeIsInActiveNodePath={nodeIsInActiveNodePath}
          data-id={node.id}
          data-parentId={node.parentId}
          data-url={dataUrl}
          data-nodeType={node.nodeType}
          data-label={node.label}
          data-menuType={node.menuType}
          onClick={onClickNode}
        >
          {useSymbolIcon &&
            <SymbolIcon
              id="symbol"
              nodeIsInActiveNodePath={nodeIsInActiveNodePath}
              className="material-icons"
            >
              {symbolIcon}
            </SymbolIcon>}
          {useSymbolSpan &&
            <SymbolSpan nodeIsInActiveNodePath={nodeIsInActiveNodePath}>
              {'-'}
            </SymbolSpan>}
          <TextSpan nodeIsInActiveNodePath={nodeIsInActiveNodePath}>
            {node.label}
          </TextSpan>
        </StyledNode>
      </ContextMenuTrigger>
    </div>
  )
}

export default enhance(Row)
