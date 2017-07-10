// @flow
import React from 'react'
import { QueryRenderer, graphql } from 'react-relay'
import { toJS } from 'mobx'
import { observer, inject } from 'mobx-react'
import compose from 'recompose/compose'
import app from 'ampersand-app'

import App from './App'
import getActiveTaxonomyObjectId from '../modules/getActiveTaxonomyObjectId'

const enhance = compose(inject('store'), observer)

const AppQuery = ({ store }: { store: Object }) => {
  const existsLevel1 = store.activeNodeArray.length > 0
  const existsLevel2Taxonomy =
    existsLevel1 &&
    store.activeNodeArray[0] === 'Taxonomien' &&
    store.activeNodeArray.length > 0
  const level2Taxonomy = existsLevel2Taxonomy
    ? store.activeNodeArray[0]
    : 'none'
  const existsLevel2Pc =
    existsLevel1 &&
    store.activeNodeArray[0] === 'Eigenschaften-Sammlungen' &&
    store.activeNodeArray.length > 0
  const level2Pc = existsLevel2Pc ? store.activeNodeArray[0] : 'none'
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
  const activeTaxonomyObjectId = getActiveTaxonomyObjectId(store)
  const existsActiveTaxonomyObject = !!activeTaxonomyObjectId
  const existsUrlFromTOId = !!store.urlFromTOId
  const urlFromTOId =
    store.urlFromTOId || '99999999-9999-9999-9999-999999999999'
  const existsTreeFilterText = !!store.treeFilter.text
  const treeFilterText = store.treeFilter.text || 'ZZZZ'
  const queryGroups = store.activeNodeArray[0].toLowerCase() === 'export'
  const exportCategories = toJS(store.export.categories)
  const queryExportCategories = exportCategories && exportCategories.length > 0

  return (
    <QueryRenderer
      environment={app.environment}
      query={graphql`
        query AppQueryQuery(
          $existsLevel2Pc: Boolean!
          $level2Pc: String!
          $existsLevel2Taxonomy: Boolean!
          $level2Taxonomy: String!
          $existsLevel3: Boolean!
          $level3Taxonomy: String!
          $existsLevel4: Boolean!
          $level4Taxonomy: Uuid!
          $existsLevel5: Boolean!
          $level5Taxonomy: Uuid!
          $existsLevel6: Boolean!
          $level6Taxonomy: Uuid!
          $existsLevel7: Boolean!
          $level7Taxonomy: Uuid!
          $existsLevel8: Boolean!
          $level8Taxonomy: Uuid!
          $existsLevel9: Boolean!
          $level9Taxonomy: Uuid!
          $existsLevel10: Boolean!
          $level10Taxonomy: Uuid!
          $activeTaxonomyObjectId: Uuid!
          $existsActiveTaxonomyObject: Boolean!
          $existsUrlFromTOId: Boolean!
          $urlFromTOId: Uuid!
          $existsTreeFilterText: Boolean!
          $treeFilterText: String!
          $queryGroups: Boolean!
          $queryExportCategories: Boolean!
          $exportCategories: [String]
        ) {
          allCategories {
            totalCount
          }
          allPropertyCollections {
            totalCount
          }
          propertyCollectionByDataType(datatype: $level2Pc)
            @include(if: $existsLevel2Pc) {
            nodes {
              id
              name
              propertyCollectionObjectsByPropertyCollectionId {
                totalCount
              }
            }
          }
          level2Taxonomy: categoryByDataType(datatype: $level2Taxonomy)
            @include(if: $existsLevel2Taxonomy) {
            nodes {
              id
              name
              taxonomyByCategory {
                totalCount
              }
            }
          }
          level3Taxonomy: categoryByName(name: $level3Taxonomy)
            @include(if: $existsLevel3) {
            taxonomiesByCategory {
              nodes {
                id
                name
                objectLevel1 {
                  totalCount
                }
              }
            }
          }
          level4Taxonomy: taxonomyById(id: $level4Taxonomy)
            @include(if: $existsLevel4) {
            objectLevel1 {
              nodes {
                id
                name
                objectsByParentId {
                  totalCount
                }
              }
            }
          }
          level5Taxonomy: objectById(id: $level5Taxonomy)
            @include(if: $existsLevel5) {
            objectsByParentId {
              totalCount
              nodes {
                id
                name
                objectsByParentId {
                  totalCount
                }
              }
            }
          }
          level6Taxonomy: objectById(id: $level6Taxonomy)
            @include(if: $existsLevel6) {
            objectsByParentId {
              totalCount
              nodes {
                id
                name
                objectsByParentId {
                  totalCount
                }
              }
            }
          }
          level7Taxonomy: objectById(id: $level7Taxonomy)
            @include(if: $existsLevel7) {
            objectsByParentId {
              totalCount
              nodes {
                id
                name
                objectsByParentId {
                  totalCount
                }
              }
            }
          }
          level8Taxonomy: objectById(id: $level8Taxonomy)
            @include(if: $existsLevel8) {
            objectsByParentId {
              totalCount
              nodes {
                id
                name
                objectsByParentId {
                  totalCount
                }
              }
            }
          }
          level9Taxonomy: objectById(id: $level9Taxonomy)
            @include(if: $existsLevel9) {
            objectsByParentId {
              totalCount
              nodes {
                id
                name
                objectsByParentId {
                  totalCount
                }
              }
            }
          }
          level10Taxonomy: objectById(id: $level10Taxonomy)
            @include(if: $existsLevel10) {
            objectsByParentId {
              totalCount
              nodes {
                id
                name
                objectsByParentId {
                  totalCount
                }
              }
            }
          }
          objectById(id: $activeTaxonomyObjectId)
            @include(if: $existsActiveTaxonomyObject) {
            objectByObjectId {
              id
              objectsByObjectId {
                totalCount
                nodes {
                  taxonomyByTaxonomyId {
                    id
                    name
                    description
                    links
                    lastUpdated
                    organizationByOrganizationId {
                      name
                    }
                  }
                  id
                  name
                  properties
                  synonymsByTaxonomyObjectId {
                    totalCount
                    nodes {
                      objectIdSynonym
                      objectByTaxonomyObjectIdSynonym {
                        id
                        name
                        properties
                        taxonomyByTaxonomyId {
                          name
                          description
                          links
                          lastUpdated
                          organizationByOrganizationId {
                            name
                          }
                        }
                        objectByObjectId {
                          id
                          propertyCollectionObjectsByObjectId {
                            totalCount
                            nodes {
                              objectId
                              propertyCollectionId
                              properties
                              propertyCollectionByPropertyCollectionId {
                                name
                                description
                                links
                                combining
                                lastUpdated
                                termsOfUse
                                importedBy
                                organizationByOrganizationId {
                                  name
                                }
                                userByImportedBy {
                                  name
                                  email
                                }
                              }
                              relationsByPropertyCollectionObjectId {
                                totalCount
                                nodes {
                                  id
                                  relatedObjectId
                                  relationType
                                  properties
                                  objectByRelatedObjectId {
                                    id
                                    category
                                    objectsByObjectId {
                                      totalCount
                                      nodes {
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
              }
              propertyCollectionObjectsByObjectId {
                totalCount
                nodes {
                  objectId
                  propertyCollectionId
                  properties
                  propertyCollectionByPropertyCollectionId {
                    name
                    description
                    links
                    combining
                    lastUpdated
                    termsOfUse
                    importedBy
                    organizationByOrganizationId {
                      name
                    }
                    userByImportedBy {
                      name
                      email
                    }
                  }
                  relationsByPropertyCollectionObjectId {
                    totalCount
                    nodes {
                      id
                      relatedObjectId
                      relationType
                      properties
                      objectByRelatedObjectId {
                        id
                        category
                        objectsByObjectId {
                          totalCount
                          nodes {
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
          urlFromTO: objectById(id: $urlFromTOId)
            @include(if: $existsUrlFromTOId) {
            id
            objectByParentId {
              id
              objectByParentId {
                id
                objectByParentId {
                  id
                  objectByParentId {
                    id
                    objectByParentId {
                      id
                      objectByParentId {
                        id
                      }
                    }
                  }
                }
              }
            }
            taxonomyByTaxonomyId {
              id
              categoryByCategory {
                name
                dataType
              }
            }
          }
          filterSuggestionsPC: propertyCollectionByPropertyName(
            propertyName: $treeFilterText
          ) @include(if: $existsTreeFilterText) {
            totalCount
            nodes {
              id
              name
            }
          }
          filterSuggestionsTO: objectByObjectName(objectName: $treeFilterText)
            @include(if: $existsTreeFilterText) {
            totalCount
            nodes {
              id
              name
            }
          }
          allCategories @include(if: $queryGroups) {
            nodes {
              name
            }
          }
          pcoPropertiesByCategoriesFunction(categories: $exportCategories)
            @include(if: $queryExportCategories) {
            nodes {
              propertyCollectionName
              propertyName
              jsontype
              count
            }
          }
        }
      `}
      variables={{
        existsLevel2Pc,
        level2Pc,
        existsLevel2Taxonomy,
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
        activeTaxonomyObjectId,
        existsActiveTaxonomyObject,
        existsUrlFromTOId,
        urlFromTOId,
        existsTreeFilterText,
        treeFilterText,
        queryGroups,
        queryExportCategories,
        exportCategories,
      }}
      render={({ error, props }) => {
        if (error) {
          return (
            <div>
              {error.message}
            </div>
          )
        }
        if (props) {
          store.setProps(props)
        } else {
          /**
           * TODO:
           * Add loading node to lowest level
           * but only if there are children for this layer
           */
        }

        return <App />
      }}
    />
  )
}

export default enhance(AppQuery)
