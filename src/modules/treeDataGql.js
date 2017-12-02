// @flow

import gql from 'graphql-tag'

export default gql`
  query TreeDataQuery(
    $existsLevel2Pc: Boolean!
    $notExistsLevel2Pc: Boolean!
    $existsLevel2Taxonomy: Boolean!
    $existsLevel3: Boolean!
    $level3Taxonomy: String!
    $existsLevel4: Boolean!
    $level4Taxonomy: UUID!
    $level4TaxonomyPossibleNull: UUID
    $existsLevel5: Boolean!
    $level5Taxonomy: UUID!
    $existsLevel6: Boolean!
    $level6Taxonomy: UUID!
    $existsLevel7: Boolean!
    $level7Taxonomy: UUID!
    $existsLevel8: Boolean!
    $level8Taxonomy: UUID!
    $existsLevel9: Boolean!
    $level9Taxonomy: UUID!
    $existsLevel10: Boolean!
    $level10Taxonomy: UUID!
  ) {
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
  }
  ${gql`
    fragment ObjektLevel5AndUp on Object {
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
  `}
`
