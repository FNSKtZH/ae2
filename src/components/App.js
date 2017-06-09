// @flow
import React from 'react'
import { ReflexContainer, ReflexSplitter, ReflexElement } from 'react-reflex'
import { QueryRenderer, graphql } from 'react-relay'
import styled from 'styled-components'
import { observer, inject } from 'mobx-react'
import compose from 'recompose/compose'
import app from 'ampersand-app'
import get from 'lodash/get'

import AppBar from './AppBar'
import Tree from './Tree'
import Main from './Main'
import level1FromProps from '../modules/nodes/level1FromProps'
import level2TaxonomyFromProps from '../modules/nodes/level2TaxonomyFromProps'
import level3TaxonomyFromProps from '../modules/nodes/level3TaxonomyFromProps'
import level4TaxonomyFromProps from '../modules/nodes/level4TaxonomyFromProps'
import level5TaxonomyFromProps from '../modules/nodes/level5TaxonomyFromProps'
import level6TaxonomyFromProps from '../modules/nodes/level6TaxonomyFromProps'
import level7TaxonomyFromProps from '../modules/nodes/level7TaxonomyFromProps'
import level8TaxonomyFromProps from '../modules/nodes/level8TaxonomyFromProps'
import level9TaxonomyFromProps from '../modules/nodes/level9TaxonomyFromProps'
import level10TaxonomyFromProps from '../modules/nodes/level10TaxonomyFromProps'

const Container = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
`
const Column = styled.div`
  padding: 5px;
  height: 100%;
`

const enhance = compose(inject('store'), observer)

const App = ({ store }: { store: Object }) => {
  return (
    <QueryRenderer
      environment={app.environment}
      query={graphql`
        query AppQuery(
          $level2Taxonomy: String!,
          $level3Taxonomy: String!,
          $level4Taxonomy: Uuid!,
          $level5Taxonomy: Uuid!,
          $level6Taxonomy: Uuid!,
          $level7Taxonomy: Uuid!,
          $level8Taxonomy: Uuid!,
          $level9Taxonomy: Uuid!,
          $level10Taxonomy: Uuid!
        ) {
          allCategories {
            totalCount
          }
          allPropertyCollections {
            totalCount
            nodes {
              id
              name
              propertyCollectionObjectsByPropertyCollectionId {
                totalCount
              }
            }
          }
          allRelationCollections {
            totalCount
            nodes {
              id
              name
              relationCollectionObjectsByRelationCollectionId {
                totalCount
              }
            }
          }
          level2Taxonomy: categoryByDataType(datatype: $level2Taxonomy) {
            nodes {
              id
              name
              taxonomyByCategory {
                totalCount
              }
            }
          }
          level3Taxonomy: categoryByName(name: $level3Taxonomy) {
            taxonomiesByCategory {
              nodes {
                id
                name
                taxonomyObjectLevel1 {
                  totalCount
                }
              }
            }
          }
          level4Taxonomy: taxonomyById(id: $level4Taxonomy) {
            taxonomyObjectLevel1 {
              nodes {
                id
                name
                taxonomyObjectsByParentId {
                  totalCount
                }
              }
            }
          }
          level5Taxonomy: taxonomyObjectById(id: $level5Taxonomy) {
            taxonomyObjectsByParentId {
              totalCount
              nodes {
                id
                name
                taxonomyObjectsByParentId {
                  totalCount
                }
              }
            }
          }
          level6Taxonomy: taxonomyObjectById(id: $level6Taxonomy) {
            taxonomyObjectsByParentId {
              totalCount
              nodes {
                id
                name
                taxonomyObjectsByParentId {
                  totalCount
                }
              }
            }
          }
          level7Taxonomy: taxonomyObjectById(id: $level7Taxonomy) {
            taxonomyObjectsByParentId {
              totalCount
              nodes {
                id
                name
                taxonomyObjectsByParentId {
                  totalCount
                }
              }
            }
          }
          level8Taxonomy: taxonomyObjectById(id: $level8Taxonomy) {
            taxonomyObjectsByParentId {
              totalCount
              nodes {
                id
                name
                taxonomyObjectsByParentId {
                  totalCount
                }
              }
            }
          }
          level9Taxonomy: taxonomyObjectById(id: $level9Taxonomy) {
            taxonomyObjectsByParentId {
              totalCount
              nodes {
                id
                name
                taxonomyObjectsByParentId {
                  totalCount
                }
              }
            }
          }
          level10Taxonomy: taxonomyObjectById(id: $level10Taxonomy) {
            taxonomyObjectsByParentId {
              totalCount
              nodes {
                id
                name
                taxonomyObjectsByParentId {
                  totalCount
                }
              }
            }
          }
        }
      `}
      variables={{
        level2Taxonomy: store.activeNodeArray.length > 0
          ? store.activeNodeArray[0]
          : 'none',
        level3Taxonomy: store.activeNodeArray.length > 1
          ? store.activeNodeArray[1]
          : 'none',
        level4Taxonomy: store.activeNodeArray.length > 2
          ? store.activeNodeArray[2]
          : '99999999-9999-9999-9999-999999999999',
        level5Taxonomy: store.activeNodeArray.length > 3
          ? store.activeNodeArray[3]
          : '99999999-9999-9999-9999-999999999999',
        level6Taxonomy: store.activeNodeArray.length > 4
          ? store.activeNodeArray[4]
          : '99999999-9999-9999-9999-999999999999',
        level7Taxonomy: store.activeNodeArray.length > 5
          ? store.activeNodeArray[5]
          : '99999999-9999-9999-9999-999999999999',
        level8Taxonomy: store.activeNodeArray.length > 6
          ? store.activeNodeArray[6]
          : '99999999-9999-9999-9999-999999999999',
        level9Taxonomy: store.activeNodeArray.length > 7
          ? store.activeNodeArray[7]
          : '99999999-9999-9999-9999-999999999999',
        level10Taxonomy: store.activeNodeArray.length > 8
          ? store.activeNodeArray[8]
          : '99999999-9999-9999-9999-999999999999',
      }}
      render={({ error, props }) => {
        if (error) {
          return <div>{error.message}</div>
        } else if (props) {
          const activeLevel2TaxonomyNodes = get(props, 'level2Taxonomy.nodes')
          const activeLevel2Taxonomy =
            activeLevel2TaxonomyNodes &&
            activeLevel2TaxonomyNodes.find(
              n => n.name === store.activeNodeArray[1]
            )
          const activeLevel2TaxonomyName =
            activeLevel2Taxonomy && activeLevel2Taxonomy.name
          const activeLevel3TaxonomyNodes = get(
            props,
            'level3Taxonomy.taxonomiesByCategory.nodes'
          )
          const activeLevel3Taxonomy =
            activeLevel3TaxonomyNodes &&
            activeLevel3TaxonomyNodes.find(
              n => n.id === store.activeNodeArray[2]
            )
          const activeLevel3TaxonomyName =
            activeLevel3Taxonomy && activeLevel3Taxonomy.name
          const activeLevel3TaxonomyId =
            activeLevel3Taxonomy && activeLevel3Taxonomy.id
          const activeLevel4TaxonomyNodes = get(
            props,
            'level4Taxonomy.taxonomyObjectLevel1.nodes'
          )
          const activeLevel4Taxonomy =
            activeLevel4TaxonomyNodes &&
            activeLevel4TaxonomyNodes.find(
              n => n.id === store.activeNodeArray[3]
            )
          const activeLevel4TaxonomyName =
            activeLevel4Taxonomy && activeLevel4Taxonomy.name
          const activeLevel4TaxonomyId =
            activeLevel4Taxonomy && activeLevel4Taxonomy.id
          const activeLevel5TaxonomyNodes = get(
            props,
            'level5Taxonomy.taxonomyObjectsByParentId.nodes'
          )
          const activeLevel5Taxonomy =
            activeLevel5TaxonomyNodes &&
            activeLevel5TaxonomyNodes.find(
              n => n.id === store.activeNodeArray[4]
            )
          const activeLevel5TaxonomyName =
            activeLevel5Taxonomy && activeLevel5Taxonomy.name
          const activeLevel5TaxonomyId =
            activeLevel5Taxonomy && activeLevel5Taxonomy.id

          const activeLevel6TaxonomyNodes = get(
            props,
            'level6Taxonomy.taxonomyObjectsByParentId.nodes'
          )
          const activeLevel6Taxonomy =
            activeLevel6TaxonomyNodes &&
            activeLevel6TaxonomyNodes.find(
              n => n.id === store.activeNodeArray[5]
            )
          const activeLevel6TaxonomyName =
            activeLevel6Taxonomy && activeLevel6Taxonomy.name
          const activeLevel6TaxonomyId =
            activeLevel6Taxonomy && activeLevel6Taxonomy.id
          const activeLevel7TaxonomyNodes = get(
            props,
            'level7Taxonomy.taxonomyObjectsByParentId.nodes'
          )
          const activeLevel7Taxonomy =
            activeLevel7TaxonomyNodes &&
            activeLevel7TaxonomyNodes.find(
              n => n.id === store.activeNodeArray[6]
            )
          const activeLevel7TaxonomyName =
            activeLevel7Taxonomy && activeLevel7Taxonomy.name
          const activeLevel7TaxonomyId =
            activeLevel7Taxonomy && activeLevel7Taxonomy.id
          const activeLevel8TaxonomyNodes = get(
            props,
            'level8Taxonomy.taxonomyObjectsByParentId.nodes'
          )
          const activeLevel8Taxonomy =
            activeLevel8TaxonomyNodes &&
            activeLevel8TaxonomyNodes.find(
              n => n.id === store.activeNodeArray[7]
            )
          const activeLevel8TaxonomyName =
            activeLevel8Taxonomy && activeLevel8Taxonomy.name
          const activeLevel8TaxonomyId =
            activeLevel8Taxonomy && activeLevel8Taxonomy.id
          const activeLevel9TaxonomyNodes = get(
            props,
            'level9Taxonomy.taxonomyObjectsByParentId.nodes'
          )
          const activeLevel9Taxonomy =
            activeLevel9TaxonomyNodes &&
            activeLevel9TaxonomyNodes.find(
              n => n.id === store.activeNodeArray[8]
            )
          const activeLevel9TaxonomyName =
            activeLevel9Taxonomy && activeLevel9Taxonomy.name
          const activeLevel9TaxonomyId =
            activeLevel9Taxonomy && activeLevel9Taxonomy.id
          let nodes = level1FromProps(store, props)
          if (store.activeNodeArray.length > 0) {
            nodes = nodes.concat(level2TaxonomyFromProps(store, props))
          }
          if (store.activeNodeArray.length > 1) {
            nodes = nodes.concat(
              level3TaxonomyFromProps({
                store,
                props,
                activeLevel2TaxonomyName,
              })
            )
          }
          if (store.activeNodeArray.length > 2) {
            nodes = nodes.concat(
              level4TaxonomyFromProps({
                store,
                props,
                activeLevel2TaxonomyName,
                activeLevel3TaxonomyName,
                activeLevel3TaxonomyId,
              })
            )
          }
          if (store.activeNodeArray.length > 3) {
            nodes = nodes.concat(
              level5TaxonomyFromProps({
                store,
                props,
                activeLevel2TaxonomyName,
                activeLevel3TaxonomyName,
                activeLevel3TaxonomyId,
                activeLevel4TaxonomyName,
                activeLevel4TaxonomyId,
              })
            )
          }
          if (store.activeNodeArray.length > 4) {
            nodes = nodes.concat(
              level6TaxonomyFromProps({
                store,
                props,
                activeLevel2TaxonomyName,
                activeLevel3TaxonomyName,
                activeLevel3TaxonomyId,
                activeLevel4TaxonomyName,
                activeLevel4TaxonomyId,
                activeLevel5TaxonomyName,
                activeLevel5TaxonomyId,
              })
            )
          }
          if (store.activeNodeArray.length > 5) {
            nodes = nodes.concat(
              level7TaxonomyFromProps({
                store,
                props,
                activeLevel2TaxonomyName,
                activeLevel3TaxonomyName,
                activeLevel3TaxonomyId,
                activeLevel4TaxonomyName,
                activeLevel4TaxonomyId,
                activeLevel5TaxonomyName,
                activeLevel5TaxonomyId,
                activeLevel6TaxonomyName,
                activeLevel6TaxonomyId,
              })
            )
          }
          if (store.activeNodeArray.length > 6) {
            nodes = nodes.concat(
              level8TaxonomyFromProps({
                store,
                props,
                activeLevel2TaxonomyName,
                activeLevel3TaxonomyName,
                activeLevel3TaxonomyId,
                activeLevel4TaxonomyName,
                activeLevel4TaxonomyId,
                activeLevel5TaxonomyName,
                activeLevel5TaxonomyId,
                activeLevel6TaxonomyName,
                activeLevel6TaxonomyId,
                activeLevel7TaxonomyName,
                activeLevel7TaxonomyId,
              })
            )
          }
          if (store.activeNodeArray.length > 7) {
            nodes = nodes.concat(
              level9TaxonomyFromProps({
                store,
                props,
                activeLevel2TaxonomyName,
                activeLevel3TaxonomyName,
                activeLevel3TaxonomyId,
                activeLevel4TaxonomyName,
                activeLevel4TaxonomyId,
                activeLevel5TaxonomyName,
                activeLevel5TaxonomyId,
                activeLevel6TaxonomyName,
                activeLevel6TaxonomyId,
                activeLevel7TaxonomyName,
                activeLevel7TaxonomyId,
                activeLevel8TaxonomyName,
                activeLevel8TaxonomyId,
              })
            )
          }
          if (store.activeNodeArray.length > 8) {
            nodes = nodes.concat(
              level10TaxonomyFromProps({
                store,
                props,
                activeLevel2TaxonomyName,
                activeLevel3TaxonomyName,
                activeLevel3TaxonomyId,
                activeLevel4TaxonomyName,
                activeLevel4TaxonomyId,
                activeLevel5TaxonomyName,
                activeLevel5TaxonomyId,
                activeLevel6TaxonomyName,
                activeLevel6TaxonomyId,
                activeLevel7TaxonomyName,
                activeLevel7TaxonomyId,
                activeLevel8TaxonomyName,
                activeLevel8TaxonomyId,
                activeLevel9TaxonomyName,
                activeLevel9TaxonomyId,
              })
            )
          }
          return (
            <Container>
              <AppBar />
              <ReflexContainer orientation="vertical">
                {store.ui.visibleColumns.tree &&
                  <ReflexElement flex={0.35}>
                    <Tree
                      activeNodeArray={store.activeNodeArray}
                      nodes={nodes}
                    />
                  </ReflexElement>}
                {store.ui.visibleColumns.tree &&
                  store.ui.visibleColumns.main &&
                  <ReflexSplitter key="treeSplitter" />}
                {store.ui.visibleColumns.main &&
                  <ReflexElement><Column><Main /></Column></ReflexElement>}
              </ReflexContainer>
            </Container>
          )
        }
        return (
          <Container>
            <AppBar />
            <ReflexContainer orientation="vertical">
              {store.ui.visibleColumns.tree &&
                <ReflexElement flex={0.35}>
                  <Tree activeNodeArray={store.activeNodeArray} nodes={[]} />
                </ReflexElement>}
              {store.ui.visibleColumns.tree &&
                store.ui.visibleColumns.main &&
                <ReflexSplitter key="treeSplitter" />}
              {store.ui.visibleColumns.main &&
                <ReflexElement><Column><Main /></Column></ReflexElement>}
            </ReflexContainer>
          </Container>
        )
        // return <div>Lade Daten</div>
      }}
    />
  )
}

export default enhance(App)
