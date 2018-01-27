// @flow
import React from 'react'
// if observer is active, forceUpdate during rendering happens
import AutoSizer from 'react-virtualized/dist/commonjs/AutoSizer'
import List from 'react-virtualized/dist/commonjs/List'
import styled from 'styled-components'
import compose from 'recompose/compose'
import findIndex from 'lodash/findIndex'
import isEqual from 'lodash/isEqual'
import Snackbar from 'material-ui/Snackbar'
import get from 'lodash/get'

import Row from './Row'
import Filter from './Filter'
import buildNodes from './buildNodes'
import activeNodeArrayData from '../../modules/activeNodeArrayData'
import allCategoriesData from '../../modules/allCategoriesData'
import loginData from '../../modules/loginData'
import organizationUserData from '../../modules/organizationUserData'
import treeData from './treeData'
import CmBenutzerFolder from './contextmenu/BenutzerFolder'
import CmBenutzer from './contextmenu/Benutzer'
import CmObject from './contextmenu/Object'
import ErrorBoundary from '../shared/ErrorBoundary'

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

const noRowsRenderer = nodes => (
  <Container>
    <LoadingDiv>lade Daten...</LoadingDiv>
  </Container>
)

const enhance = compose(
  activeNodeArrayData,
  allCategoriesData,
  treeData,
  loginData,
  organizationUserData
)

const Tree = ({
  activeNodeArrayData,
  allCategoriesData,
  treeData,
  loginData,
  organizationUserData,
  // dimensions is passed down from ReflexElement
  dimensions,
}: {
  activeNodeArrayData: Object,
  allCategoriesData: Object,
  treeData: Object,
  loginData: Object,
  organizationUserData: Object,
  dimensions: Object,
}) => {
  const { activeNodeArray } = activeNodeArrayData
  const { error, loading: treeDataLoading } = treeData
  const nodes = buildNodes({
    treeData,
    allCategoriesData,
    activeNodeArray,
    loginData,
  })
  const rowRenderer = ({ key, index, style }) => (
    <Row
      key={key}
      index={index}
      style={style}
      node={nodes[index]}
      activeNodeArray={activeNodeArray}
      treeData={treeData}
    />
  )
  const activeNodeIndex = findIndex(nodes, node =>
    isEqual(node.url, activeNodeArray)
  )
  if (error) {
    console.log('Tree: error:', error)
    return <div> {error.message} </div>
  }
  const login = get(loginData, 'login')
  const username = login && login.username ? login.username : null
  const organizationUsers = get(
    organizationUserData,
    'allOrganizationUsers.nodes',
    []
  )
  const userRoles = organizationUsers
    .filter(oU => username === get(oU, 'userByUserId.name', ''))
    .map(oU => oU.role)
  const userIsTaxWriter =
    userRoles.includes('orgAdmin') || userRoles.includes('orgTaxonomyWriter')

  return (
    <ErrorBoundary>
      <Container>
        <Filter dimensions={dimensions} />
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
        <Snackbar
          open={treeDataLoading}
          message="lade Daten..."
          bodyStyle={{
            maxWidth: 'auto',
            minWidth: 'auto',
            backgroundColor: '#2E7D32',
          }}
        />
        <CmBenutzerFolder />
        <CmBenutzer />
        {userIsTaxWriter && <CmObject />}
      </Container>
    </ErrorBoundary>
  )
}

export default enhance(Tree)
