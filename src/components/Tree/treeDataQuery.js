import { gql } from '@apollo/client'

export default gql`
  query TreeDataQuery(
    $existsLevel2Pc: Boolean!
    $existsLevel2Taxonomy: Boolean!
    $level2Taxonomy: UUID!
    $existsLevel3Object: Boolean!
    $level3Object: UUID!
    $existsLevel4Object: Boolean!
    $level4Object: UUID!
    $existsLevel5Object: Boolean!
    $level5Object: UUID!
    $existsLevel6Object: Boolean!
    $level6Object: UUID!
    $existsLevel7Object: Boolean!
    $level7Object: UUID!
    $existsLevel8Object: Boolean!
    $level8Object: UUID!
    $existsLevel9Object: Boolean!
    $level9Object: UUID!
    $pCId: UUID!
    $existsPCId: Boolean!
  ) {
    allPropertyCollections {
      totalCount
      nodes @include(if: $existsLevel2Pc) {
        id
        name
        propertyCollectionObjectsByPropertyCollectionId {
          totalCount
        }
        relationsByPropertyCollectionId {
          totalCount
        }
      }
    }
    artTaxonomies: allTaxonomies(filter: { type: { equalTo: ART } }) {
      totalCount
      nodes {
        id
        name
        type
        objectsByTaxonomyId {
          totalCount
        }
        topLevelObjects: objectsByTaxonomyId(
          filter: { parentId: { isNull: true } }
        ) {
          totalCount
        }
      }
    }
    lrTaxonomies: allTaxonomies(filter: { type: { equalTo: LEBENSRAUM } }) {
      totalCount
      nodes {
        id
        name
        type
        objectsByTaxonomyId {
          totalCount
        }
        topLevelObjects: objectsByTaxonomyId(
          filter: { parentId: { isNull: true } }
        ) {
          totalCount
        }
      }
    }
    # leave this here: is only used once more, without objectsByTaxonomyId
    allTaxonomies {
      nodes {
        id
        name
        type
        objectsByTaxonomyId {
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
    taxonomyObjectLevel1(taxonomyId: $level2Taxonomy)
      @include(if: $existsLevel2Taxonomy) {
      totalCount
      nodes {
        id
        name
        objectsByParentId {
          totalCount
        }
      }
    }
    level4Object: objectById(id: $level3Object)
      @include(if: $existsLevel3Object) {
      ...ObjektLevel4AndUp
    }
    level5Object: objectById(id: $level4Object)
      @include(if: $existsLevel4Object) {
      ...ObjektLevel4AndUp
    }
    level6Object: objectById(id: $level5Object)
      @include(if: $existsLevel5Object) {
      ...ObjektLevel4AndUp
    }
    level7Object: objectById(id: $level6Object)
      @include(if: $existsLevel6Object) {
      ...ObjektLevel4AndUp
    }
    level8Object: objectById(id: $level7Object)
      @include(if: $existsLevel7Object) {
      ...ObjektLevel4AndUp
    }
    level9Object: objectById(id: $level8Object)
      @include(if: $existsLevel8Object) {
      ...ObjektLevel4AndUp
    }
    level10Object: objectById(id: $level9Object)
      @include(if: $existsLevel9Object) {
      ...ObjektLevel4AndUp
    }
  }
  ${gql`
    fragment ObjektLevel4AndUp on Object {
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
