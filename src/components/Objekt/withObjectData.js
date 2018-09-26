// @flow
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import get from 'lodash/get'

import getActiveObjectIdFromNodeArray from '../../modules/getActiveObjectIdFromNodeArray'

export default graphql(
  gql`
    query ObjectQuery($objectId: UUID!) {
      objectById(id: $objectId) {
        id
        taxonomyId
        parentId
        name
        properties
        idOld
        synonymsByObjectId {
          totalCount
          nodes {
            nodeId
            objectId
            objectIdSynonym
            objectByObjectIdSynonym {
              id
              taxonomyId
              parentId
              name
              properties
              idOld
              taxonomyByTaxonomyId {
                id
                name
                type
                description
                links
                lastUpdated
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
                  propertyCollectionOfOrigin
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
                  }
                }
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
            }
          }
        }
        taxonomyByTaxonomyId {
          id
          name
          type
          description
          links
          lastUpdated
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
            propertyCollectionOfOrigin
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
              taxonomyByTaxonomyId {
                id
                name
                type
              }
            }
          }
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
            }
          }
        }
      }
    }
  `,
  {
    options: ({ activeNodeArrayData }) => ({
      variables: {
        objectId: getActiveObjectIdFromNodeArray(
          get(activeNodeArrayData, 'activeNodeArray', [])
        ),
      },
    }),
    name: 'objectData',
  }
)
