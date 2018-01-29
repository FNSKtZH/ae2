// @flow

import gql from 'graphql-tag'

export default gql`
  query TreeDataQuery(
    $existsLevel2Pc: Boolean!
    $notExistsLevel2Pc: Boolean!
    $existsLevel2Taxonomy: Boolean!
    $existsLevel3: Boolean!
    $level3Taxonomy: UUID!
    $level3TaxonomyPossibleNull: UUID
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
    $pCId: UUID!
    $existsPCId: Boolean!
  ) {
    allUsers {
      totalCount
      nodes {
        id
        name
        organizationUsersByUserId {
          nodes {
            id
            role
            organizationByOrganizationId {
              id
              name
            }
          }
        }
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
    level3Pc: propertyCollectionById(id: $pCId) @include(if: $existsPCId) {
      id
      name
      propertyCollectionObjectsByPropertyCollectionId {
        totalCount
      }
      relationsByPropertyCollectionId {
        totalCount
      }
    }
    level2Taxonomy: allTaxonomies @include(if: $existsLevel2Taxonomy) {
      nodes {
        id
        name
        type
        objectLevel1(taxonomyId: $level4TaxonomyPossibleNull) {
          totalCount
        }
      }
    }
    level3Taxonomy: taxonomyById(id: $level3Taxonomy)
      @include(if: $existsLevel3) {
      id
      objectLevel1(taxonomyId: $level3TaxonomyPossibleNull) {
        nodes {
          id
          name
          objectsByParentId {
            totalCount
          }
        }
      }
    }
    level4Taxonomy: objectById(id: $level4Taxonomy)
      @include(if: $existsLevel4) {
      ...ObjektLevel5AndUp
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
