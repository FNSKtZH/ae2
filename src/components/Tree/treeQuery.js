import { gql } from '@apollo/client'

export default gql`
  query TreeDataQuery(
    $existsLevel2Pc: Boolean!
    $existsLevel2Taxonomy: Boolean!
    $level2Taxonomy: UUID!
    $existsLevel3Object: Boolean!
    $existsLevel4Object: Boolean!
    $existsLevel5Object: Boolean!
    $existsLevel6Object: Boolean!
    $existsLevel7Object: Boolean!
    $existsLevel8Object: Boolean!
    $existsLevel9Object: Boolean!
    $pCId: UUID!
    $existsPCId: Boolean!
    $username: String!
  ) {
    userByName(name: $username) {
      id
    }
    allUsers {
      totalCount
      nodes {
        id
        name
        email
        organizationUsersByUserId {
          nodes {
            id
            organizationId
            role
            organizationByOrganizationId {
              id
              name
            }
          }
        }
      }
    }
    allOrganizationUsers {
      nodes {
        id
        nodeId
        organizationId
        userId
        role
        userByUserId {
          id
          name
        }
      }
    }
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
    level3Object: allObjects(
      filter: {
        taxonomyId: { equalTo: $level2Taxonomy }
        parentId: { isNull: true }
      }
    ) @include(if: $existsLevel2Taxonomy) {
      nodes {
        id
        name
        childrenCount: objectsByParentId {
          totalCount
        }
        objectsByParentId {
          nodes {
            id
            name
            childrenCount: objectsByParentId @include(if: $existsLevel3Object) {
              totalCount
            }
            objectsByParentId @include(if: $existsLevel3Object) {
              nodes {
                id
                name
                childrenCount: objectsByParentId
                  @include(if: $existsLevel4Object) {
                  totalCount
                }
                objectsByParentId @include(if: $existsLevel4Object) {
                  nodes {
                    id
                    name
                    childrenCount: objectsByParentId
                      @include(if: $existsLevel5Object) {
                      totalCount
                    }
                    objectsByParentId @include(if: $existsLevel5Object) {
                      nodes {
                        id
                        name
                        childrenCount: objectsByParentId
                          @include(if: $existsLevel6Object) {
                          totalCount
                        }
                        objectsByParentId @include(if: $existsLevel6Object) {
                          nodes {
                            id
                            name
                            childrenCount: objectsByParentId
                              @include(if: $existsLevel7Object) {
                              totalCount
                            }
                            objectsByParentId
                              @include(if: $existsLevel7Object) {
                              nodes {
                                id
                                name
                                childrenCount: objectsByParentId
                                  @include(if: $existsLevel8Object) {
                                  totalCount
                                }
                                objectsByParentId
                                  @include(if: $existsLevel8Object) {
                                  nodes {
                                    id
                                    name
                                    childrenCount: objectsByParentId
                                      @include(if: $existsLevel9Object) {
                                      totalCount
                                    }
                                    objectsByParentId
                                      @include(if: $existsLevel9Object) {
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
              }
            }
          }
        }
      }
    }
  }
`
