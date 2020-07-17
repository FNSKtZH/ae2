import React, { useCallback, useContext } from 'react'
import styled from 'styled-components'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import MoreHorizIcon from '@material-ui/icons/MoreHoriz'
import Icon from '@material-ui/core/Icon'
import isEqual from 'lodash/isEqual'
import { useApolloClient } from '@apollo/react-hooks'
import { observer } from 'mobx-react-lite'
import { navigate } from 'gatsby'
import ErrorBoundary from 'react-error-boundary'

import { ContextMenuTrigger } from '../../../modules/react-contextmenu'
import isUrlInActiveNodePath from '../../../modules/isUrlInActiveNodePath'
import onClickContextMenuDo from './onClickContextMenu'
import mobxStoreContext from '../../../mobxStoreContext'

const singleRowHeight = 23
const StyledNode = styled.div`
  padding-left: ${(props) => `${Number(props['data-level']) * 17 - 17}px`};
  height: ${singleRowHeight}px;
  max-height: ${singleRowHeight}px;
  box-sizing: border-box;
  margin: 0;
  display: flex;
  flex-direction: row;
  white-space: nowrap;
  user-select: none;
  cursor: pointer;
  color: ${(props) =>
    props['data-nodeisinactivenodepath'] ? '#D84315' : 'inherit'};
  &:hover {
    color: #f57c00 !important;
  }
`
const SymbolIcon = styled(Icon)`
  margin-top: ${(props) =>
    props['data-nodeisinactivenodepath']
      ? '-5px !important'
      : '-2px !important'};
  padding-left: ${(props) =>
    props['data-nodeisinactivenodepath'] ? '2px' : '2px'};
  font-size: ${(props) =>
    props['data-nodeisinactivenodepath']
      ? '26px !important'
      : '22px !important'};
  font-weight: ${(props) =>
    props['data-nodeisinactivenodepath'] ? '700 !important' : 'inherit'};
  color: ${(props) =>
    props['data-nodeisinactivenodepath'] ? '#D84315 !important' : 'inherit'};
  width: 26px;
  &:hover {
    color: #f57c00 !important;
  }
`
const SymbolSpan = styled.span`
  padding-right: 8px !important;
  padding-left: ${(props) =>
    props['data-nodeisinactivenodepath'] ? '8px' : '9px'};
  font-weight: ${(props) =>
    props['data-nodeisinactivenodepath'] ? '700 !important' : 'inherit'};
  margin-top: ${(props) =>
    props['data-nodeisinactivenodepath'] ? '-9px' : '-9px'};
  font-size: 28px !important;
  width: 26px;
`
const TextSpan = styled.span`
  margin-left: 0;
  font-size: 16px !important;
  font-weight: ${(props) =>
    props['data-nodeisinactivenodepath'] ? '700 !important' : 'inherit'};
`
const InfoSpan = styled.span`
  margin-left: 5px;
  font-size: 12px !important;
  line-height: 23px;
`

function collect(props) {
  return props
}

const Row = ({ index, style, node, treeRefetch, userId }) => {
  const client = useApolloClient()
  const mobxStore = useContext(mobxStoreContext)
  const activeNodeArray = mobxStore.activeNodeArray.toJS()

  const nodeIsInActiveNodePath = isUrlInActiveNodePath(
    node.url,
    activeNodeArray,
  )
  // build symbols
  let useSymbolIcon = true
  let useSymbolSpan = false
  let symbol
  if (node.childrenCount && nodeIsInActiveNodePath) {
    symbol = 'ExpandMore'
  } else if (node.childrenCount) {
    symbol = 'ChevronRight'
  } else if (node.label === 'lade Daten') {
    symbol = 'MoreHoriz'
  } else {
    useSymbolSpan = true
    useSymbolIcon = false
  }
  const { url, loadingNode } = node
  const level = url && url.length ? url.length : 0

  const onClickNode = useCallback(
    (event) => {
      // do nothing when loading indicator is clicked
      if (loadingNode) return
      // or if node is already active
      if (!isEqual(url, activeNodeArray)) {
        navigate(`/${url.join('/')}`)
      }
    },
    [loadingNode, url, activeNodeArray],
  )
  const onClickExpandMore = useCallback(
    (event) => {
      // do nothing when loading indicator is clicked
      if (loadingNode) return
      if (isEqual(url, activeNodeArray)) {
        // close node if its expand mor symbol was clicked
        const newUrl = [...url]
        newUrl.pop()
        navigate(`/${newUrl.join('/')}`)
        // prevent onClick on node
        event.preventDefault()
      }
    },
    [loadingNode, url, activeNodeArray],
  )
  const onClickContextMenu = useCallback(
    (e, data, target) => {
      onClickContextMenuDo({
        e,
        data,
        target,
        client,
        treeRefetch,
        userId,
        mobxStore,
      })
    },
    [client, treeRefetch, userId, mobxStore],
  )

  return (
    <div key={index} style={style}>
      <ErrorBoundary>
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
            data-url={node.url}
            onClick={onClickNode}
          >
            {useSymbolIcon && (
              <SymbolIcon
                id="symbol"
                data-nodeisinactivenodepath={nodeIsInActiveNodePath}
                className="material-icons"
              >
                {symbol === 'ExpandMore' && (
                  <ExpandMoreIcon onClick={onClickExpandMore} />
                )}
                {symbol === 'ChevronRight' && <ChevronRightIcon />}
                {symbol === 'MoreHoriz' && <MoreHorizIcon />}
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
      </ErrorBoundary>
    </div>
  )
}

export default observer(Row)
