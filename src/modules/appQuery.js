// @flow

import gql from 'graphql-tag'

import TreeRow from '../components/TreeRow'

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
    $treeFilterId: Uuid!
    $existsTreeFilterId: Boolean!
    $treeFilterText: String!
    $queryGroups: Boolean!
    $queryExportCategories: Boolean!
    $exportCategories: [String]
  ) {
    # somehow this alters behaviour
    # and makes node array not work any more
    #activeNodeArray @client
    #exportCategories @client
    #exportCombineTaxonomies @client
    #exportTaxProperties @client {
    #  taxName
    #  pName
    #}
    #exportPcoProperties @client {
    #  pCName
    #  pName
    #}
    #exportRcoProperties @client {
    #  pCName
    #  pName
    #}
    #exportTooManyProperties @client
    #allCategories {
    #  totalCount
    #}
    # somehow this alters behaviour
    # and makes filter not work
    #treeFilter @client {
    #  text
    #  id
    #}
    allTaxonomies {
      totalCount
      nodes {
        id
        name
      }
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
      ...ObjektLevel5AndUp
    }
    level6Taxonomy: objectById(id: $level6Taxonomy)
      @include(if: $existsLevel6) {
      ...ObjektLevel5AndUp
    }
    level7Taxonomy: objectById(id: $level7Taxonomy)
      @include(if: $existsLevel7) {
      ...ObjektLevel5AndUp
    }
    level8Taxonomy: objectById(id: $level8Taxonomy)
      @include(if: $existsLevel8) {
      ...ObjektLevel5AndUp
    }
    level9Taxonomy: objectById(id: $level9Taxonomy)
      @include(if: $existsLevel9) {
      ...ObjektLevel5AndUp
    }
    level10Taxonomy: objectById(id: $level10Taxonomy)
      @include(if: $existsLevel10) {
      ...ObjektLevel5AndUp
    }
    objectUrlData: objectById(id: $treeFilterId)
      @include(if: $existsTreeFilterId) {
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
    rcoPropertiesByCategoriesFunction(categories: $exportCategories)
      @include(if: $queryExportCategories) {
      nodes {
        propertyCollectionName
        relationType
        propertyName
        jsontype
        count
      }
    }
    taxPropertiesByCategoriesFunction(categories: $exportCategories)
      @include(if: $queryExportCategories) {
      nodes {
        taxonomyName
        propertyName
        jsontype
        count
      }
    }
  }
  ${TreeRow.fragments.objektLevel5AndUp}
`
