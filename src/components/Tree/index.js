import React, { useRef, useEffect, useState, useContext } from 'react'
// if observer is active, forceUpdate during rendering happens
import { FixedSizeList as List } from 'react-window'
import styled from 'styled-components'
import findIndex from 'lodash/findIndex'
import isEqual from 'lodash/isEqual'
import Snackbar from '@material-ui/core/Snackbar'
import { useQuery } from '@apollo/client'
import { observer } from 'mobx-react-lite'
import SimpleBar from 'simplebar-react'

import Row from './Row'
import Filter from './Filter'
import buildNodes from './buildNodes'
import treeQuery from './treeQuery'
import treeQueryVariables from './treeQueryVariables'
import CmBenutzerFolder from './contextmenu/BenutzerFolder'
import CmBenutzer from './contextmenu/Benutzer'
import CmObject from './contextmenu/Object'
import CmTaxonomy from './contextmenu/Taxonomy'
import CmType from './contextmenu/Type'
import CmPCFolder from './contextmenu/PCFolder'
import CmPC from './contextmenu/PC'
import mobxStoreContext from '../../mobxStoreContext'
import ErrorBoundary from '../shared/ErrorBoundary'

const singleRowHeight = 23
const ErrorContainer = styled.div`
  padding: 24px;
`
const Container = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  ul {
    margin: 0;
    list-style: none;
    padding: 0 0 0 1.1em;
  }

  /*
   * context menu
   */

  .react-contextmenu {
    display: flex;
    flex-direction: column;
    min-width: 100px;
    padding: 5px 0;
    margin: 2px 0 0;
    font-size: 14px;
    text-align: left;
    background-color: rgb(66, 66, 66);
    background-clip: padding-box;
    border: 1px solid grey;
    border-radius: 0.25rem;
    outline: none;
    opacity: 0;
    pointer-events: none;
    font-family: 'Roboto', sans-serif;
  }

  .react-contextmenu.react-contextmenu--visible {
    color: white;
    opacity: 1;
    pointer-events: auto;
    z-index: 1000;
  }

  .react-contextmenu-title {
    opacity: 0;
  }

  .react-contextmenu--visible .react-contextmenu-title {
    color: #b3b3b3;
    padding-left: 10px;
    padding-right: 15px;
    padding-bottom: 3px;
    opacity: 1;
  }

  .react-contextmenu > .react-contextmenu-item {
    display: inline-block;
    padding: 3px 20px;
    clear: both;
    font-weight: 400;
    line-height: 1.5;
    color: white;
    text-align: inherit;
    white-space: nowrap;
    background: 0 0;
    border: 0;
    text-decoration: none;
    cursor: pointer;
  }

  .react-contextmenu-item.active,
  .react-contextmenu-item:hover {
    color: #f57c00;
    border-color: #0275d8;
    text-decoration: none;
  }
  .react-contextmenu-divider {
    border-top: 1px solid grey;
    margin-top: 4px;
    margin-bottom: 7px;
  }
  .react-contextmenu-submenu {
    padding-right: 27px !important;
  }

  .react-contextmenu-submenu:after {
    content: '▶';
    display: inline-block;
    position: absolute;
    right: 7px;
    bottom: 3px;
  }
`
const StyledList = styled(List)`
  overflow-x: hidden !important;
  scrollbar-width: thin;
  scrollbar-color: transparent transparent;

  /* hide native scrollbar */
  &::-webkit-scrollbar {
    width: 1px;
  }
  &::-webkit-scrollbar-track {
    background: transparent;
    box-shadow: none;
  }
  &::-webkit-scrollbar-thumb {
    background-color: transparent;
    box-shadow: none;
  }
`
const AutoSizerContainer = styled.div`
  height: 100%;
  padding: 5px 0;
`
const StyledSnackbar = styled(Snackbar)`
  div {
    min-width: auto;
    background-color: #2e7d32 !important;
    /* for unknown reason only this snackbar gets
     * flex-grow 1 set
     * which makes it fill 100% width
     */
    flex-grow: 0;
  }
`

const Tree = ({ dimensions }) => {
  const mobxStore = useContext(mobxStoreContext)
  const { login } = mobxStore
  const activeNodeArray = mobxStore.activeNodeArray.toJS()

  const treeQueryVars = treeQueryVariables({ activeNodeArray })
  const {
    data: treeDataFetched,
    loading: treeLoading,
    error: treeError,
    refetch: treeRefetch,
  } = useQuery(treeQuery, {
    variables: {
      ...treeQueryVariables({ activeNodeArray }),
      username: login.username,
    },
  })

  // prevent tree from rebuilding from the top
  // every time a new branch is clicked
  const [treeData, setTreeData] = useState({})
  useEffect(() => {
    if (!treeLoading && treeDataFetched) {
      setTreeData(treeDataFetched)
    }
  }, [treeDataFetched, treeLoading])

  const treeDataLoading = treeLoading
  const userId = treeData?.userByName?.id
  const nodes = buildNodes({
    treeData,
    activeNodeArray,
    treeDataLoading,
    mobxStore,
  })

  useEffect(() => {
    const index = findIndex(nodes, (node) => isEqual(node.url, activeNodeArray))
    listRef.current &&
      listRef.current.scrollToItem &&
      listRef.current.scrollToItem(index)
  }, [activeNodeArray, nodes])

  const { username } = login
  const organizationUsers = treeData?.allOrganizationUsers?.nodes ?? []
  const userRoles = organizationUsers
    .filter((oU) => username === oU?.userByUserId?.name ?? '')
    .map((oU) => oU.role)
  const userIsTaxWriter =
    userRoles.includes('orgAdmin') || userRoles.includes('orgTaxonomyWriter')

  const height = isNaN(dimensions.height) ? 250 : dimensions.height - 44
  const width = isNaN(dimensions.width) ? 250 : dimensions.width

  const listRef = useRef(null)

  if (treeError) {
    return (
      <ErrorContainer>{`Error fetching data: ${treeError.message}`}</ErrorContainer>
    )
  }

  return (
    <ErrorBoundary>
      <Container>
        <Filter dimensions={dimensions} />
        <SimpleBar style={{ maxHeight: height, height: '100%' }}>
          {({ scrollableNodeRef, contentNodeRef }) => {
            return (
              <AutoSizerContainer>
                <StyledList
                  height={height}
                  itemCount={nodes.length}
                  itemSize={singleRowHeight}
                  width={width}
                  ref={listRef}
                  innerRef={contentNodeRef}
                  outerRef={scrollableNodeRef}
                  //style={{ overflow: 'hidden' }}
                >
                  {({ index, style }) => (
                    <Row
                      key={index}
                      style={style}
                      index={index}
                      node={nodes[index]}
                      treeRefetch={treeRefetch}
                      userId={userId}
                    />
                  )}
                </StyledList>
              </AutoSizerContainer>
            )
          }}
        </SimpleBar>
        <StyledSnackbar open={treeDataLoading} message="lade Daten..." />
        <CmBenutzerFolder />
        <CmBenutzer />
        {userIsTaxWriter && (
          <>
            <CmObject />
            <CmTaxonomy />
            <CmType />
            <CmPCFolder />
            <CmPC />
          </>
        )}
      </Container>
    </ErrorBoundary>
  )
}

export default observer(Tree)
