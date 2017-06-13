// @flow
import React from 'react'
import { QueryRenderer, graphql } from 'react-relay'
import { observer, inject } from 'mobx-react'
import compose from 'recompose/compose'
import app from 'ampersand-app'

import App from './App'
import buildNodesFromAppQuery from '../modules/buildNodesFromAppQuery'
import getActiveTaxonomyId from '../modules/getActiveTaxonomyId'

const enhance = compose(inject('store'), observer)

const AppQuery = ({ store }: { store: Object }) => {
  const existsLevel2 = store.activeNodeArray.length > 0
  const level2Taxonomy = existsLevel2 ? store.activeNodeArray[0] : 'none'
  const existsLevel3 = store.activeNodeArray.length > 1
  const level3Taxonomy = existsLevel3 ? store.activeNodeArray[1] : 'none'
  const existsLevel4 = store.activeNodeArray.length > 2
  const level4Taxonomy = existsLevel4
    ? store.activeNodeArray[2]
    : '99999999-9999-9999-9999-999999999999'
  const existsLevel5 = store.activeNodeArray.length > 3
  const level5Taxonomy = existsLevel5
    ? store.activeNodeArray[3]
    : '99999999-9999-9999-9999-999999999999'
  const existsLevel6 = store.activeNodeArray.length > 4
  const level6Taxonomy = existsLevel6
    ? store.activeNodeArray[4]
    : '99999999-9999-9999-9999-999999999999'
  const existsLevel7 = store.activeNodeArray.length > 5
  const level7Taxonomy = existsLevel7
    ? store.activeNodeArray[5]
    : '99999999-9999-9999-9999-999999999999'
  const existsLevel8 = store.activeNodeArray.length > 6
  const level8Taxonomy = existsLevel8
    ? store.activeNodeArray[6]
    : '99999999-9999-9999-9999-999999999999'
  const existsLevel9 = store.activeNodeArray.length > 7
  const level9Taxonomy = existsLevel9
    ? store.activeNodeArray[7]
    : '99999999-9999-9999-9999-999999999999'
  const existsLevel10 = store.activeNodeArray.length > 8
  const level10Taxonomy = existsLevel10
    ? store.activeNodeArray[8]
    : '99999999-9999-9999-9999-999999999999'
  const activeTaxonomy = getActiveTaxonomyId(store)
  return (
    <QueryRenderer
      environment={app.environment}
      query={graphql`
        query AppQueryQuery(
          $existsLevel2: Boolean!,
          $level2Taxonomy: String!,
          $existsLevel3: Boolean!,
          $level3Taxonomy: String!,
          $existsLevel4: Boolean!,
          $level4Taxonomy: Uuid!,
          $existsLevel5: Boolean!,
          $level5Taxonomy: Uuid!,
          $existsLevel6: Boolean!,
          $level6Taxonomy: Uuid!,
          $existsLevel7: Boolean!,
          $level7Taxonomy: Uuid!,
          $existsLevel8: Boolean!,
          $level8Taxonomy: Uuid!,
          $existsLevel9: Boolean!,
          $level9Taxonomy: Uuid!,
          $existsLevel10: Boolean!,
          $level10Taxonomy: Uuid!
          $activeTaxonomy: Uuid!
        ) {
          allCategories {
            totalCount
          }
          allPropertyCollections {
            totalCount
          }
          propertyCollectionByDataType(datatype: $level2Taxonomy) @include(if: $existsLevel2) {
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
          }
          relationCollectionByDataType(datatype: $level2Taxonomy) @include(if: $existsLevel2) {
            nodes {
              id
              name
              relationCollectionObjectsByRelationCollectionId {
                totalCount
              }
            }
          }
          level2Taxonomy: categoryByDataType(datatype: $level2Taxonomy) @include(if: $existsLevel2) {
            nodes {
              id
              name
              taxonomyByCategory {
                totalCount
              }
            }
          }
          level3Taxonomy: categoryByName(name: $level3Taxonomy) @include(if: $existsLevel3) {
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
          level4Taxonomy: taxonomyById(id: $level4Taxonomy) @include(if: $existsLevel4) {
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
          level5Taxonomy: taxonomyObjectById(id: $level5Taxonomy) @include(if: $existsLevel5) {
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
          level6Taxonomy: taxonomyObjectById(id: $level6Taxonomy) @include(if: $existsLevel6) {
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
          level7Taxonomy: taxonomyObjectById(id: $level7Taxonomy) @include(if: $existsLevel7) {
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
          level8Taxonomy: taxonomyObjectById(id: $level8Taxonomy) @include(if: $existsLevel8) {
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
          level9Taxonomy: taxonomyObjectById(id: $level9Taxonomy) @include(if: $existsLevel9) {
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
          level10Taxonomy: taxonomyObjectById(id: $level10Taxonomy) @include(if: $existsLevel10) {
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
          taxonomyObjectById(id: $activeTaxonomy) {
            objectByObjectId {
              ...Objekt
              id
              taxonomyObjectsByObjectId {
                totalCount
                nodes {
                  taxonomyByTaxonomyId {
                    name
                    description
                    links
                    lastUpdated
                    organizationByOrganizationId {
                      name
                    }
                  }
                  name
                }
              }
              propertyCollectionObjectsByObjectId {
                totalCount
                nodes {
                  properties
                }
              }
              relationCollectionObjectsByObjectId {
                totalCount
                nodes {
                  relationsByObjectIdAndRelationCollectionId {
                    totalCount
                    nodes {
                      properties
                      relationPartnersByRelationId {
                        totalCount
                        nodes {
                          objectByObjectId {
                            taxonomyObjectsByObjectId {
                              totalCount
                              nodes {
                                id
                                name
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      `}
      variables={{
        existsLevel2,
        level2Taxonomy,
        existsLevel3,
        level3Taxonomy,
        existsLevel4,
        level4Taxonomy,
        existsLevel5,
        level5Taxonomy,
        existsLevel6,
        level6Taxonomy,
        existsLevel7,
        level7Taxonomy,
        existsLevel8,
        level8Taxonomy,
        existsLevel9,
        level9Taxonomy,
        existsLevel10,
        level10Taxonomy,
        activeTaxonomy,
      }}
      render={({ error, props }) => {
        if (error) {
          return <div>{error.message}</div>
        }
        if (props) {
          console.log('AppQuery: props:', props)
          buildNodesFromAppQuery(store, props)
        } else {
          /**
           * TODO:
           * Add loading node to lowest level
           * but only if there are children for this layer
           */
        }
        /**
         * need to pass nodes down through all components,
         * not via mobx
         * reason: passing via mobx causes side effect error in this render method!
         * At the same time need to store nodes in mobx because
         * relay passes props = null every time it requeries
         * This causes rebuild of entire tree every time a user clicks
         * through the tree.
         * This can be prevented if nodes are fetched from mobx when props are null
         * TODO: use other cache method? look up relay docs
         */
        return <App nodes={store.nodes} />
      }}
    />
  )
}

export default enhance(AppQuery)
