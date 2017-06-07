// @flow
import React from 'react'
import { toJS } from 'mobx'
import { observer, inject } from 'mobx-react'
import styled from 'styled-components'
import compose from 'recompose/compose'
import { ContextMenuTrigger } from 'react-contextmenu'
import FontIcon from 'material-ui/FontIcon'

const singleRowHeight = 23
const StyledNode = styled.div`
  padding-left: ${props => `${Number(props.level) * 17 - 10}px`};
  height: ${singleRowHeight}px;
  max-height: ${singleRowHeight}px;
  box-sizing: border-box;
  margin: 0;
  display: flex;
  flex-direction: row;
  white-space: nowrap;
  user-select: none;
`
const SymbolIcon = styled(FontIcon)`
  margin-top: -2px !important;
  padding-left: 2px;
  font-size: 22px !important;
  width: 26px;
  cursor: pointer;
  &:hover {
    color: #F57C00 !important;
  }
`
const SymbolSpan = styled.span`
  padding-right: 8px !important;
  padding-left: 9px;
  margin-top: -9px !important;
  font-size: 28px !important;
  width: 26px;
`
const TextSpan = styled.span`
  margin-left: 0;
  font-size: 16px !important;
  cursor: pointer;
  &:hover {
    color: #F57C00;
  }
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
  const onClickNode = event => {
    store.setActiveNodeArray(node.url)
  }
  const onClickNodeSymbol = event => {
    console.log('todo')
  }
  const myProps = { key: index }
  // build symbols
  let useSymbolIcon = true
  let useSymbolSpan = false
  let symbolIcon
  if (node.childrenCount /* && isNodeOpen(toJS(tree.openNodes), node.url)*/) {
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
  const level = node.url.length - 1

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
          data-id={node.id}
          data-parentId={node.parentId}
          data-url={dataUrl}
          data-nodeType={node.nodeType}
          data-label={node.label}
          data-menuType={node.menuType}
        >
          {useSymbolIcon &&
            <SymbolIcon
              id="symbol"
              className="material-icons"
              onClick={onClickNodeSymbol}
            >
              {symbolIcon}
            </SymbolIcon>}
          {useSymbolSpan &&
            <SymbolSpan>
              {'-'}
            </SymbolSpan>}
          <TextSpan node={node} onClick={onClickNode}>
            {node.label}
          </TextSpan>
        </StyledNode>
      </ContextMenuTrigger>
    </div>
  )
}

export default enhance(Row)
