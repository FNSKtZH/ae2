// @flow
import React from 'react'
import { ReflexContainer, ReflexSplitter, ReflexElement } from 'react-reflex'
import { QueryRenderer, graphql } from 'react-relay'
import styled from 'styled-components'
import { observer, inject } from 'mobx-react'
import compose from 'recompose/compose'
import app from 'ampersand-app'

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
          $level1: String,
          $level2Taxonomy: String!,
          $level3Taxonomy: Uuid!,
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
          level1Taxonomy: categoryByDataType(datatype: $level1) {
            nodes {
              id
              name
              taxonomyByCategory {
                totalCount
              }
            }
          }
          level2Taxonomy: categoryByName(name: $level2Taxonomy) {
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
          level3Taxonomy: taxonomyById(id: $level3Taxonomy) {
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
          level4Taxonomy: taxonomyObjectById(id: $level4Taxonomy) {
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
        level1: store.activeNodeArray[0],
        level2Taxonomy: store.activeNodeArray[1] || 'none',
        level3Taxonomy:
          store.activeNodeArray[2] || '99999999-9999-9999-9999-999999999999',
        level4Taxonomy:
          store.activeNodeArray[3] || '99999999-9999-9999-9999-999999999999',
        level5Taxonomy:
          store.activeNodeArray[4] || '99999999-9999-9999-9999-999999999999',
        level6Taxonomy:
          store.activeNodeArray[5] || '99999999-9999-9999-9999-999999999999',
        level7Taxonomy:
          store.activeNodeArray[6] || '99999999-9999-9999-9999-999999999999',
        level8Taxonomy:
          store.activeNodeArray[7] || '99999999-9999-9999-9999-999999999999',
        level9Taxonomy:
          store.activeNodeArray[8] || '99999999-9999-9999-9999-999999999999',
        level10Taxonomy:
          store.activeNodeArray[9] || '99999999-9999-9999-9999-999999999999',
      }}
      render={({ error, props }) => {
        if (error) {
          return <div>{error.message}</div>
        } else if (props) {
          console.log('App: props:', props)
          const activeLevel2Taxonomy = props.level2Taxonomy.taxonomiesByCategory.nodes.find(
            n => n.id === store.activeNodeArray[1],
          )
          const activeLevel2TaxonomyName = activeLevel2Taxonomy &&
            activeLevel2Taxonomy.name
            ? activeLevel2Taxonomy.name
            : null
          const activeLevel3Taxonomy = props.level3Taxonomy.taxonomyObjectLevel1.nodes.find(
            n => n.id === store.activeNodeArray[2],
          )
          const activeLevel3TaxonomyName = activeLevel3Taxonomy &&
            activeLevel3Taxonomy.name
            ? activeLevel3Taxonomy.name
            : null
          const activeLevel3TaxonomyId = activeLevel3Taxonomy &&
            activeLevel3Taxonomy.id
            ? activeLevel3Taxonomy.id
            : null
          const activeLevel4Taxonomy = props.level4Taxonomy.taxonomyObjectsByParentId.nodes.find(
            n => n.id === store.activeNodeArray[3],
          )
          const activeLevel4TaxonomyName = activeLevel4Taxonomy &&
            activeLevel4Taxonomy.name
            ? activeLevel4Taxonomy.name
            : null
          const activeLevel4TaxonomyId = activeLevel4Taxonomy &&
            activeLevel4Taxonomy.id
            ? activeLevel4Taxonomy.id
            : null
          const activeLevel5Taxonomy = props.level5Taxonomy.taxonomyObjectsByParentId.nodes.find(
            n => n.id === store.activeNodeArray[4],
          )
          const activeLevel5TaxonomyName = activeLevel5Taxonomy &&
            activeLevel5Taxonomy.name
            ? activeLevel5Taxonomy.name
            : null
          const activeLevel5TaxonomyId = activeLevel5Taxonomy &&
            activeLevel5Taxonomy.id
            ? activeLevel5Taxonomy.id
            : null
          const activeLevel6Taxonomy = props.level6Taxonomy.taxonomyObjectsByParentId.nodes.find(
            n => n.id === store.activeNodeArray[5],
          )
          const activeLevel6TaxonomyName = activeLevel6Taxonomy &&
            activeLevel6Taxonomy.name
            ? activeLevel6Taxonomy.name
            : null
          const activeLevel6TaxonomyId = activeLevel6Taxonomy &&
            activeLevel6Taxonomy.id
            ? activeLevel6Taxonomy.id
            : null
          const activeLevel7Taxonomy = props.level7Taxonomy.taxonomyObjectsByParentId.nodes.find(
            n => n.id === store.activeNodeArray[6],
          )
          const activeLevel7TaxonomyName = activeLevel7Taxonomy &&
            activeLevel7Taxonomy.name
            ? activeLevel7Taxonomy.name
            : null
          const activeLevel7TaxonomyId = activeLevel7Taxonomy &&
            activeLevel7Taxonomy.id
            ? activeLevel7Taxonomy.id
            : null
          const activeLevel8Taxonomy = props.level8Taxonomy.taxonomyObjectsByParentId.nodes.find(
            n => n.id === store.activeNodeArray[7],
          )
          const activeLevel8TaxonomyName = activeLevel8Taxonomy &&
            activeLevel8Taxonomy.name
            ? activeLevel8Taxonomy.name
            : null
          const activeLevel8TaxonomyId = activeLevel8Taxonomy &&
            activeLevel8Taxonomy.id
            ? activeLevel8Taxonomy.id
            : null
          const activeLevel9Taxonomy = props.level9Taxonomy.taxonomyObjectsByParentId.nodes.find(
            n => n.id === store.activeNodeArray[8],
          )
          const activeLevel9TaxonomyName = activeLevel9Taxonomy &&
            activeLevel9Taxonomy.name
            ? activeLevel9Taxonomy.name
            : null
          const activeLevel9TaxonomyId = activeLevel9Taxonomy &&
            activeLevel9Taxonomy.id
            ? activeLevel9Taxonomy.id
            : null
          const nodes = [
            ...level1FromProps(store, props),
            ...level2TaxonomyFromProps(store, props),
            ...level3TaxonomyFromProps({
              store,
              props,
              activeLevel2TaxonomyName,
            }),
            ...level4TaxonomyFromProps({
              store,
              props,
              activeLevel2TaxonomyName,
              activeLevel3TaxonomyName,
              activeLevel3TaxonomyId,
            }),
            ...level5TaxonomyFromProps({
              store,
              props,
              activeLevel2TaxonomyName,
              activeLevel3TaxonomyName,
              activeLevel3TaxonomyId,
              activeLevel4TaxonomyName,
              activeLevel4TaxonomyId,
            }),
            ...level6TaxonomyFromProps({
              store,
              props,
              activeLevel2TaxonomyName,
              activeLevel3TaxonomyName,
              activeLevel3TaxonomyId,
              activeLevel4TaxonomyName,
              activeLevel4TaxonomyId,
              activeLevel5TaxonomyName,
              activeLevel5TaxonomyId,
            }),
            ...level7TaxonomyFromProps({
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
            }),
            ...level8TaxonomyFromProps({
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
            }),
            ...level9TaxonomyFromProps({
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
            }),
            ...level10TaxonomyFromProps({
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
            }),
          ]
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
        return <div>Lade Daten</div>
      }}
    />
  )
}

export default enhance(App)
