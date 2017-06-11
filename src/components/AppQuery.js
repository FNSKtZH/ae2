// @flow
import React from 'react'
import { QueryRenderer, graphql } from 'react-relay'
import { observer, inject } from 'mobx-react'
import compose from 'recompose/compose'
import app from 'ampersand-app'

import App from './App'
import buildNodesFromAppQuery from '../modules/buildNodesFromAppQuery'

const enhance = compose(inject('store'), observer)

const AppQuery = ({ store }: { store: Object }) => {
  return (
    <QueryRenderer
      environment={app.environment}
      query={graphql`
        query AppQueryQuery(
          $level2Taxonomy: String!,
          $level3Taxonomy: String!,
          $level4Taxonomy: Uuid!,
          $level5Taxonomy: Uuid!,
          $level6Taxonomy: Uuid!,
          $level7Taxonomy: Uuid!,
          $level8Taxonomy: Uuid!,
          $level9Taxonomy: Uuid!,
          $level10Taxonomy: Uuid!
          $activeTaxonomy: Uuid!
        ) {
          allCategories {
            totalCount
          }
          allPropertyCollections {
            totalCount
          }
          propertyCollectionByDataType(datatype: $level2Taxonomy) {
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
          relationCollectionByDataType(datatype: $level2Taxonomy) {
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
          taxonomyObjectById(id: $activeTaxonomy) {
            objectByObjectId {
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
        activeTaxonomy:
          store.activeNodeArray[
            store.activeNodeArray.length > 2
              ? store.activeNodeArray.length - 1
              : '99999999-9999-9999-9999-999999999999'
          ],
      }}
      render={({ error, props }) => {
        if (error) {
          return <div>{error.message}</div>
        }
        if (props) {
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
