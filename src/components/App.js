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
          const nodes = [
            ...level1FromProps(store, props),
            ...level2TaxonomyFromProps(store, props),
            ...level3TaxonomyFromProps(store, props),
            ...level4TaxonomyFromProps(store, props),
            ...level5TaxonomyFromProps(store, props),
            ...level6TaxonomyFromProps(store, props),
            ...level7TaxonomyFromProps(store, props),
            ...level8TaxonomyFromProps(store, props),
            ...level9TaxonomyFromProps(store, props),
            ...level10TaxonomyFromProps(store, props),
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
