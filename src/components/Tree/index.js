// @flow
import React, { Fragment, useEffect } from 'react'
// if observer is active, forceUpdate during rendering happens
import { FixedSizeList as List } from 'react-window'
import styled from 'styled-components'
import compose from 'recompose/compose'
import findIndex from 'lodash/findIndex'
import isEqual from 'lodash/isEqual'
import Snackbar from '@material-ui/core/Snackbar'
import get from 'lodash/get'

import Row from './Row'
import Filter from './Filter'
import buildNodes from './buildNodes'
import withActiveNodeArrayData from '../../modules/withActiveNodeArrayData'
import withTreeData from './withTreeData'
import withOrganizationUsersData from '../../modules/withOrganizationUsersData'
import withAllUsersData from '../../modules/withAllUsersData'
import CmBenutzerFolder from './contextmenu/BenutzerFolder'
import CmBenutzer from './contextmenu/Benutzer'
import CmObject from './contextmenu/Object'
import CmTaxonomy from './contextmenu/Taxonomy'
import CmType from './contextmenu/Type'
import CmPCFolder from './contextmenu/PCFolder'
import CmPC from './contextmenu/PC'
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
`
const StyledList = styled(List)`
  overflow-x: hidden !important;
`
const AutoSizerContainer = styled.div`
  height: 100%;
  padding: 5px 0;
`
/*
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
`*/
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
//const listContainerStyle = { padding: '5px' }

const enhance = compose(
  withOrganizationUsersData,
  withAllUsersData,
  withActiveNodeArrayData,
  withTreeData,
)

const Tree = ({
  organizationUsersData,
  activeNodeArrayData,
  treeData: treeDataPassed,
  allUsersData,
  // dimensions is passed down from ReflexElement
  dimensions,
}: {
  organizationUsersData: Object,
  activeNodeArrayData: Object,
  treeData: Object,
  allUsersData: Object,
  dimensions: Object,
}) => {
  const treeDataLoading =
    treeDataPassed.loading ||
    organizationUsersData.loading ||
    activeNodeArrayData.loading ||
    allUsersData.loading
  if (treeDataPassed.error) {
    return <div> {treeDataPassed.error.message} </div>
  }
  if (activeNodeArrayData.error) {
    return <div> {activeNodeArrayData.error.message} </div>
  }
  if (organizationUsersData.error) {
    return <div> {organizationUsersData.error.message} </div>
  }
  if (allUsersData.error) {
    return <div> {allUsersData.error.message} </div>
  }
  const activeNodeArray = get(activeNodeArrayData, 'activeNodeArray', [])
  const treeData = { ...allUsersData, ...treeDataPassed }
  const nodes = buildNodes({
    treeData,
    activeNodeArray,
  })

  useEffect(
    () => {
      const index = findIndex(nodes, node => isEqual(node.url, activeNodeArray))
      listRef.current.scrollToItem(index)
    },
    [activeNodeArray, nodes],
  )

  const username = get(treeData, 'login.username', null)
  const organizationUsers = get(
    organizationUsersData,
    'allOrganizationUsers.nodes',
    [],
  )
  const userRoles = organizationUsers
    .filter(oU => username === get(oU, 'userByUserId.name', ''))
    .map(oU => oU.role)
  const userIsTaxWriter =
    userRoles.includes('orgAdmin') || userRoles.includes('orgTaxonomyWriter')

  const height = isNaN(dimensions.height) ? 250 : dimensions.height - 40
  const width = isNaN(dimensions.width) ? 250 : dimensions.width

  const listRef = React.createRef()

  return (
    <ErrorBoundary>
      <Container>
        <Filter dimensions={dimensions} />
        <AutoSizerContainer>
          <StyledList
            height={height}
            itemCount={nodes.length}
            itemSize={singleRowHeight}
            width={width}
            ref={listRef}
          >
            {({ index, style }) => (
              <Row
                key={index}
                index={index}
                style={style}
                node={nodes[index]}
                activeNodeArray={activeNodeArray}
              />
            )}
          </StyledList>
        </AutoSizerContainer>
        <StyledSnackbar open={treeDataLoading} message="lade Daten..." />
        <CmBenutzerFolder />
        <CmBenutzer />
        {userIsTaxWriter && (
          <Fragment>
            <CmObject />
            <CmTaxonomy />
            <CmType />
            <CmPCFolder />
            <CmPC />
          </Fragment>
        )}
      </Container>
    </ErrorBoundary>
  )
}

export default enhance(Tree)
