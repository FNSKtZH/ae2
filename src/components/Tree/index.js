// @flow
import React, { useRef, useEffect, useCallback, useState } from 'react'
// if observer is active, forceUpdate during rendering happens
import { FixedSizeList as List } from 'react-window'
import styled from 'styled-components'
import findIndex from 'lodash/findIndex'
import isEqual from 'lodash/isEqual'
import Snackbar from '@material-ui/core/Snackbar'
import get from 'lodash/get'
import { useQuery } from 'react-apollo-hooks'
import gql from 'graphql-tag'

import Row from './Row'
import Filter from './Filter'
import buildNodes from './buildNodes'
import treeDataQuery from './treeDataQuery'
import treeDataVariables from './treeDataVariables'
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

const storeQuery = gql`
  query activeNodeArrayQuery {
    activeNodeArray @client
    login @client {
      token
      username
    }
    editingTaxonomies @client
  }
`
const orgUsersQuery = gql`
  query AllOrganizationUsersQuery {
    allOrganizationUsers {
      nodes {
        id
        nodeId
        organizationId
        userId
        role
        userByUserId {
          id
          name
        }
      }
    }
  }
`
const usersQuery = gql`
  query AllUsersQuery {
    allUsers {
      totalCount
      nodes {
        id
        name
        email
        organizationUsersByUserId {
          nodes {
            id
            organizationId
            role
            organizationByOrganizationId {
              id
              name
            }
          }
        }
      }
    }
  }
`

const Tree = ({
  // dimensions is passed down from ReflexElement
  dimensions,
}: {
  dimensions: Object,
}) => {
  const { data: storeData } = useQuery(storeQuery, {
    suspend: false,
  })
  const activeNodeArray = get(storeData, 'activeNodeArray', [])
  const {
    data: treeDataFetched,
    loading: treeLoading,
    error: treeError,
  } = useQuery(treeDataQuery, {
    suspend: false,
    variables: treeDataVariables({ activeNodeArray }),
  })
  const {
    data: orgUsersData,
    loading: orgUsersLoading,
    error: orgUsersError,
  } = useQuery(orgUsersQuery, {
    suspend: false,
  })
  const {
    data: usersData,
    loading: usersLoading,
    error: usersError,
  } = useQuery(usersQuery, {
    suspend: false,
  })

  // prevent tree from rebuilding from the top
  // every time a new branch is clicked
  const [treeDataState, setTreeDataState] = useState({})
  useEffect(
    () => {
      if (!treeLoading) {
        setTreeDataState(treeDataFetched)
      }
    },
    [treeLoading],
  )

  const treeDataLoading = treeLoading || orgUsersLoading || usersLoading
  const treeData = { ...usersData, ...treeDataState }
  const nodes = buildNodes({
    treeData,
    activeNodeArray,
    treeDataLoading,
  })

  useEffect(
    () => {
      const index = findIndex(nodes, node => isEqual(node.url, activeNodeArray))
      listRef.current.scrollToItem(index)
    },
    [activeNodeArray, nodes],
  )

  const username = get(treeData, 'login.username', null)
  const organizationUsers = get(orgUsersData, 'allOrganizationUsers.nodes', [])
  const userRoles = organizationUsers
    .filter(oU => username === get(oU, 'userByUserId.name', ''))
    .map(oU => oU.role)
  const userIsTaxWriter =
    userRoles.includes('orgAdmin') || userRoles.includes('orgTaxonomyWriter')

  const height = isNaN(dimensions.height) ? 250 : dimensions.height - 40
  const width = isNaN(dimensions.width) ? 250 : dimensions.width

  const listRef = useRef(null)

  const getRow = useCallback(({ index, style }) => (
    <Row key={index} index={index} style={style} node={nodes[index]} />
  ))

  if (treeError) {
    return <Container>{`Error fetching data: ${treeError.message}`}</Container>
  }
  if (orgUsersError) {
    return (
      <Container> {`Error fetching data: ${orgUsersError.message}`} </Container>
    )
  }
  if (usersError) {
    return <Container> {`Error fetching data: ${usersError}`} </Container>
  }

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
            {getRow}
          </StyledList>
        </AutoSizerContainer>
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

export default Tree
