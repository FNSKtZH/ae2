// @flow

import { gql } from 'react-apollo'

export default gql`
  query AppQueryQuery(
    $existsLevel2Pc: Boolean!
    $notExistsLevel2Pc: Boolean!
    $existsLevel2Taxonomy: Boolean!
    $existsLevel3: Boolean!
    $level3Taxonomy: String!
    $existsLevel4: Boolean!
    $level4Taxonomy: Uuid!
    $level4TaxonomyPossibleNull: Uuid
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
    $activeObjectId: Uuid!
    $existsActiveObject: Boolean!
    $existsUrlFromTOId: Boolean!
    $urlFromTOId: Uuid!
    $treeFilterText: String!
    $queryGroups: Boolean!
    $queryExportCategories: Boolean!
    $exportCategories: [String]
  ) {
    allCategories {
      totalCount
    }
    allPropertyCollections @include(if: $notExistsLevel2Pc) {
      totalCount
    }
    allPropertyCollections @include(if: $existsLevel2Pc) {
      totalCount
      nodes {
        id
        name
        propertyCollectionObjectsByPropertyCollectionId {
          totalCount
        }
      }
    }
    level2Taxonomy: categoriesOfTaxonomiesFunction
      @include(if: $existsLevel2Taxonomy) {
      nodes {
        id
        name
        count
      }
    }
    level3Taxonomy: taxonomiesOfCategory(category: $level3Taxonomy)
      @include(if: $existsLevel3) {
      nodes {
        id
        name
        objectLevel1(taxonomyId: $level4TaxonomyPossibleNull) {
          totalCount
        }
      }
    }
    level4Taxonomy: taxonomyById(id: $level4Taxonomy)
      @include(if: $existsLevel4) {
      objectLevel1(taxonomyId: $level4TaxonomyPossibleNull) {
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
      id
      objectsByParentId {
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
      id
      objectsByParentId {
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
      id
      objectsByParentId {
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
      id
      objectsByParentId {
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
      id
      objectsByParentId {
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
      id
      objectsByParentId {
        nodes {
          id
          name
          objectsByParentId {
            totalCount
          }
        }
      }
    }
    activeObject: objectById(id: $activeObjectId)
      @include(if: $existsActiveObject) {
      id
      taxonomyId
      parentId
      name
      properties
      category
      idOld
      synonymsByObjectId {
        totalCount
        nodes {
          objectId
          objectIdSynonym
          objectByObjectIdSynonym {
            id
            taxonomyId
            parentId
            name
            properties
            category
            idOld
            taxonomyByTaxonomyId {
              id
              name
              description
              links
              lastUpdated
              isCategoryStandard
              importedBy
              termsOfUse
              habitatLabel
              habitatComments
              habitatNrFnsMin
              habitatNrFnsMax
              organizationByOrganizationId {
                id
                name
              }
            }
            propertyCollectionObjectsByObjectId {
              totalCount
              nodes {
                id
                objectId
                propertyCollectionId
                properties
                propertyCollectionByPropertyCollectionId {
                  id
                  name
                  description
                  links
                  combining
                  lastUpdated
                  termsOfUse
                  importedBy
                  organizationByOrganizationId {
                    id
                    name
                  }
                  userByImportedBy {
                    id
                    name
                    email
                  }
                }
              }
            }
            relationsByObjectId {
              totalCount
              nodes {
                id
                propertyCollectionId
                objectId
                objectIdRelation
                relationType
                properties
                propertyCollectionByPropertyCollectionId {
                  id
                  name
                  description
                  links
                  combining
                  lastUpdated
                  termsOfUse
                  importedBy
                  organizationByOrganizationId {
                    id
                    name
                  }
                  userByImportedBy {
                    id
                    name
                    email
                  }
                }
                objectByObjectIdRelation {
                  id
                  name
                  category
                }
              }
            }
          }
        }
      }
      taxonomyByTaxonomyId {
        id
        name
        description
        links
        lastUpdated
        isCategoryStandard
        importedBy
        termsOfUse
        habitatLabel
        habitatComments
        habitatNrFnsMin
        habitatNrFnsMax
        organizationByOrganizationId {
          id
          name
        }
      }
      propertyCollectionObjectsByObjectId {
        totalCount
        nodes {
          id
          objectId
          propertyCollectionId
          properties
          propertyCollectionByPropertyCollectionId {
            id
            name
            description
            links
            combining
            lastUpdated
            termsOfUse
            importedBy
            organizationByOrganizationId {
              id
              name
            }
            userByImportedBy {
              id
              name
              email
            }
          }
        }
      }
      relationsByObjectId {
        totalCount
        nodes {
          id
          propertyCollectionId
          objectId
          objectIdRelation
          relationType
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
              id
              name
            }
            userByImportedBy {
              id
              name
              email
            }
          }
          objectByObjectIdRelation {
            id
            name
            category
          }
        }
      }
    }
    urlFromTO: objectById(id: $urlFromTOId) @include(if: $existsUrlFromTOId) {
      id
      categoryByCategory {
        id
        name
        dataType
      }
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
      }
    }
    filterSuggestionsPC: propertyCollectionByPropertyName(
      propertyName: $treeFilterText
    ) {
      nodes {
        id
        name
      }
    }
    filterSuggestionsTO: objectByObjectName(objectName: $treeFilterText) {
      nodes {
        id
        name
      }
    }
    allCategories @include(if: $queryGroups) {
      nodes {
        id
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
`
