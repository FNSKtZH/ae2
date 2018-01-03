// @flow
import React from 'react'
import styled from 'styled-components'
import compose from 'recompose/compose'
import withHandlers from 'recompose/withHandlers'
import { ContextMenuTrigger } from 'react-contextmenu'
import FontIcon from 'material-ui/FontIcon'
import isEqual from 'lodash/isEqual'
import { withApollo } from 'react-apollo'
import app from 'ampersand-app'

import isUrlInActiveNodePath from '../../../modules/isUrlInActiveNodePath'
import onClickContextMenu from './onClickContextMenu'
import userData from '../../Benutzer/userData'

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
const InfoSpan = styled.span`
  margin-left: 5px;
  font-size: 12px !important;
  line-height: 20px;
`

function collect(props) {
  return props
}

const enhance = compose(
  withApollo,
  userData,
  withHandlers({
    onClickNode: ({ node, index, activeNodeArray }) => event => {
      // do nothing when loading indicator is clicked
      // or if node is already active
      const { url, loadingNode } = node
      if (!loadingNode && !isEqual(url, activeNodeArray)) {
        app.history.push(`/${url.join('/')}`)
      }
    },
    onClickContextMenu: ({ client, userData }) => (e, data, target) => {
      onClickContextMenu({ e, data, target, client, userData })
    },
  })
)

const Row = ({
  key,
  index,
  style,
  node,
  client,
  onClickNode,
  onClickContextMenu,
  activeNodeArray,
}: {
  key?: number,
  index: number,
  style: Object,
  node: Array<Object>,
  client: Object,
  onClickNode: () => void,
  onClickContextMenu: () => void,
  activeNodeArray: Array<String>,
}) => {
  const nodeIsInActiveNodePath = isUrlInActiveNodePath(
    node.url,
    activeNodeArray
  )
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
  const level = node.url.length

  return (
    <div key={key} style={style}>
      <ContextMenuTrigger
        id={node.menuType}
        collect={collect}
        nodeId={node.id}
        nodeLabel={node.label}
        key={node.id}
        onItemClick={onClickContextMenu}
      >
        <StyledNode
          data-level={level}
          data-nodeisinactivenodepath={nodeIsInActiveNodePath}
          data-id={node.id}
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
          <InfoSpan>{node.info || ''}</InfoSpan>
        </StyledNode>
      </ContextMenuTrigger>
    </div>
  )
}

export default enhance(Row)
