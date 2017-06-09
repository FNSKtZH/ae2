// @flow
import React from 'react'
import { ReflexContainer, ReflexSplitter, ReflexElement } from 'react-reflex'
import { QueryRenderer, graphql } from 'react-relay'
import styled from 'styled-components'
import { observer, inject } from 'mobx-react'
import compose from 'recompose/compose'
import app from 'ampersand-app'

import AppBar from './AppBar'
import TreeLevel1 from './TreeLevel1'
import Main from './Main'

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
        query Tree(
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
          level1Pc: allPropertyCollections {
            totalCount
          }
          level1Rc: allRelationCollections {
            totalCount
          }
          level1Tax: allCategories {
            totalCount
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
          return (
            <Container>
              <AppBar />
              <ReflexContainer orientation="vertical">
                {store.ui.visibleColumns.tree &&
                  <ReflexElement flex={0.35}>
                    <TreeLevel1
                      activeNodeArray={store.activeNodeArray}
                      activeLevel1={store.tree.activeLevel1}
                      activeLevel2Taxonomy={store.tree.activeLevel2Taxonomy}
                      activeLevel3Taxonomy={store.tree.activeLevel3Taxonomy}
                      activeLevel4Taxonomy={store.tree.activeLevel4Taxonomy}
                      activeLevel5Taxonomy={store.tree.activeLevel5Taxonomy}
                      activeLevel6Taxonomy={store.tree.activeLevel6Taxonomy}
                      activeLevel7Taxonomy={store.tree.activeLevel7Taxonomy}
                      activeLevel8Taxonomy={store.tree.activeLevel8Taxonomy}
                      activeLevel9Taxonomy={store.tree.activeLevel9Taxonomy}
                      activeLevel10Taxonomy={store.tree.activeLevel10Taxonomy}
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
