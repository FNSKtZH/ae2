/**
 * @flow
 * @relayHash 9b8fae1377cb3e64ca6c6329a9812ac0
 */

/* eslint-disable */

'use strict';

/*::
import type {ConcreteBatch} from 'relay-runtime';
export type AppQueryQueryResponse = {|
  +allCategories: ?{|
    +nodes: ?$ReadOnlyArray<{|
      +name: string;
    |}>;
    +totalCount?: ?number;
  |};
  +allPropertyCollections: ?{|
    +nodes: ?$ReadOnlyArray<{|
      +id: any;
      +name: string;
      +propertyCollectionObjectsByPropertyCollectionId: ?{|
        +totalCount: ?number;
      |};
    |}>;
    +totalCount?: ?number;
  |};
  +level2Taxonomy?: ?{|
    +nodes: ?$ReadOnlyArray<?{|
      +name: ?string;
      +id: ?any;
      +count: ?any;
    |}>;
  |};
  +level3Taxonomy?: ?{|
    +nodes: ?$ReadOnlyArray<?{|
      +id: any;
      +name: string;
      +objectLevel1: ?{|
        +totalCount: ?number;
      |};
    |}>;
  |};
  +level4Taxonomy?: ?{|
    +objectLevel1: ?{|
      +nodes: ?$ReadOnlyArray<?{|
        +id: any;
        +name: string;
        +objectsByParentId: ?{|
          +totalCount: ?number;
        |};
      |}>;
    |};
  |};
  +level5Taxonomy?: ?{|
    +objectsByParentId: ?{|
      +nodes: ?$ReadOnlyArray<{|
        +id: any;
        +name: string;
        +objectsByParentId: ?{|
          +totalCount: ?number;
        |};
      |}>;
    |};
  |};
  +level6Taxonomy?: ?{|
    +objectsByParentId: ?{|
      +nodes: ?$ReadOnlyArray<{|
        +id: any;
        +name: string;
        +objectsByParentId: ?{|
          +totalCount: ?number;
        |};
      |}>;
    |};
  |};
  +level7Taxonomy?: ?{|
    +objectsByParentId: ?{|
      +nodes: ?$ReadOnlyArray<{|
        +id: any;
        +name: string;
        +objectsByParentId: ?{|
          +totalCount: ?number;
        |};
      |}>;
    |};
  |};
  +level8Taxonomy?: ?{|
    +objectsByParentId: ?{|
      +nodes: ?$ReadOnlyArray<{|
        +id: any;
        +name: string;
        +objectsByParentId: ?{|
          +totalCount: ?number;
        |};
      |}>;
    |};
  |};
  +level9Taxonomy?: ?{|
    +objectsByParentId: ?{|
      +nodes: ?$ReadOnlyArray<{|
        +id: any;
        +name: string;
        +objectsByParentId: ?{|
          +totalCount: ?number;
        |};
      |}>;
    |};
  |};
  +level10Taxonomy?: ?{|
    +objectsByParentId: ?{|
      +nodes: ?$ReadOnlyArray<{|
        +id: any;
        +name: string;
        +objectsByParentId: ?{|
          +totalCount: ?number;
        |};
      |}>;
    |};
  |};
  +activeObject?: ?{| |};
  +urlFromTO?: ?{|
    +id: any;
    +categoryByCategory: ?{|
      +name: string;
      +dataType: ?string;
    |};
    +objectByParentId: ?{|
      +id: any;
      +objectByParentId: ?{|
        +id: any;
        +objectByParentId: ?{|
          +id: any;
          +objectByParentId: ?{|
            +id: any;
            +objectByParentId: ?{|
              +id: any;
              +objectByParentId: ?{|
                +id: any;
              |};
            |};
          |};
        |};
      |};
    |};
    +taxonomyByTaxonomyId: ?{|
      +id: any;
    |};
  |};
  +filterSuggestionsPC?: ?{|
    +totalCount: ?number;
    +nodes: ?$ReadOnlyArray<?{|
      +id: any;
      +name: string;
    |}>;
  |};
  +filterSuggestionsTO?: ?{|
    +totalCount: ?number;
    +nodes: ?$ReadOnlyArray<?{|
      +id: any;
      +name: string;
    |}>;
  |};
  +pcoPropertiesByCategoriesFunction?: ?{|
    +nodes: ?$ReadOnlyArray<?{|
      +propertyCollectionName: ?string;
      +propertyName: ?string;
      +jsontype: ?string;
      +count: ?any;
    |}>;
  |};
|};
*/


/*
query AppQueryQuery(
  $existsLevel2Pc: Boolean!
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
  allPropertyCollections @include(if: $existsLevel2Pc) {
    nodes {
      id
      name
      propertyCollectionObjectsByPropertyCollectionId {
        totalCount
      }
    }
  }
  level2Taxonomy: categoriesOfTaxonomiesFunction @include(if: $existsLevel2Taxonomy) {
    nodes {
      name
      id
      count
    }
  }
  level3Taxonomy: taxonomiesOfCategory(category: $level3Taxonomy) @include(if: $existsLevel3) {
    nodes {
      id
      name
      objectLevel1(taxonomyId: $level4TaxonomyPossibleNull) {
        totalCount
      }
    }
  }
  level4Taxonomy: taxonomyById(id: $level4Taxonomy) @include(if: $existsLevel4) {
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
  level5Taxonomy: objectById(id: $level5Taxonomy) @include(if: $existsLevel5) {
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
  level6Taxonomy: objectById(id: $level6Taxonomy) @include(if: $existsLevel6) {
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
  level7Taxonomy: objectById(id: $level7Taxonomy) @include(if: $existsLevel7) {
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
  level8Taxonomy: objectById(id: $level8Taxonomy) @include(if: $existsLevel8) {
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
  level9Taxonomy: objectById(id: $level9Taxonomy) @include(if: $existsLevel9) {
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
  level10Taxonomy: objectById(id: $level10Taxonomy) @include(if: $existsLevel10) {
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
  activeObject: objectById(id: $activeObjectId) @include(if: $existsActiveObject) {
    ...Objekt_activeObject
  }
  urlFromTO: objectById(id: $urlFromTOId) @include(if: $existsUrlFromTOId) {
    id
    categoryByCategory {
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
  filterSuggestionsPC: propertyCollectionByPropertyName(propertyName: $treeFilterText) @include(if: $existsTreeFilterText) {
    totalCount
    nodes {
      id
      name
    }
  }
  filterSuggestionsTO: objectByObjectName(objectName: $treeFilterText) @include(if: $existsTreeFilterText) {
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
  pcoPropertiesByCategoriesFunction(categories: $exportCategories) @include(if: $queryExportCategories) {
    nodes {
      propertyCollectionName
      propertyName
      jsontype
      count
    }
  }
}

fragment Objekt_activeObject on Object {
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
      objectByObjectIdSynonym {
        id
        taxonomyId
        parentId
        name
        properties
        category
        idOld
        taxonomyByTaxonomyId {
          importedBy
          id
          description
          links
          lastUpdated
          isCategoryStandard
          name
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
                name
              }
              userByImportedBy {
                name
                email
              }
            }
            objectByObjectIdRelation {
              name
              category
            }
          }
        }
      }
    }
  }
  taxonomyByTaxonomyId {
    importedBy
    id
    description
    links
    lastUpdated
    isCategoryStandard
    name
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
          name
        }
        userByImportedBy {
          name
          email
        }
      }
      objectByObjectIdRelation {
        name
        category
      }
    }
  }
}
*/

const batch /*: ConcreteBatch*/ = {
  "fragment": {
    "argumentDefinitions": [
      {
        "kind": "LocalArgument",
        "name": "existsLevel2Pc",
        "type": "Boolean!",
        "defaultValue": null
      },
      {
        "kind": "LocalArgument",
        "name": "existsLevel2Taxonomy",
        "type": "Boolean!",
        "defaultValue": null
      },
      {
        "kind": "LocalArgument",
        "name": "existsLevel3",
        "type": "Boolean!",
        "defaultValue": null
      },
      {
        "kind": "LocalArgument",
        "name": "level3Taxonomy",
        "type": "String!",
        "defaultValue": null
      },
      {
        "kind": "LocalArgument",
        "name": "existsLevel4",
        "type": "Boolean!",
        "defaultValue": null
      },
      {
        "kind": "LocalArgument",
        "name": "level4Taxonomy",
        "type": "Uuid!",
        "defaultValue": null
      },
      {
        "kind": "LocalArgument",
        "name": "level4TaxonomyPossibleNull",
        "type": "Uuid",
        "defaultValue": null
      },
      {
        "kind": "LocalArgument",
        "name": "existsLevel5",
        "type": "Boolean!",
        "defaultValue": null
      },
      {
        "kind": "LocalArgument",
        "name": "level5Taxonomy",
        "type": "Uuid!",
        "defaultValue": null
      },
      {
        "kind": "LocalArgument",
        "name": "existsLevel6",
        "type": "Boolean!",
        "defaultValue": null
      },
      {
        "kind": "LocalArgument",
        "name": "level6Taxonomy",
        "type": "Uuid!",
        "defaultValue": null
      },
      {
        "kind": "LocalArgument",
        "name": "existsLevel7",
        "type": "Boolean!",
        "defaultValue": null
      },
      {
        "kind": "LocalArgument",
        "name": "level7Taxonomy",
        "type": "Uuid!",
        "defaultValue": null
      },
      {
        "kind": "LocalArgument",
        "name": "existsLevel8",
        "type": "Boolean!",
        "defaultValue": null
      },
      {
        "kind": "LocalArgument",
        "name": "level8Taxonomy",
        "type": "Uuid!",
        "defaultValue": null
      },
      {
        "kind": "LocalArgument",
        "name": "existsLevel9",
        "type": "Boolean!",
        "defaultValue": null
      },
      {
        "kind": "LocalArgument",
        "name": "level9Taxonomy",
        "type": "Uuid!",
        "defaultValue": null
      },
      {
        "kind": "LocalArgument",
        "name": "existsLevel10",
        "type": "Boolean!",
        "defaultValue": null
      },
      {
        "kind": "LocalArgument",
        "name": "level10Taxonomy",
        "type": "Uuid!",
        "defaultValue": null
      },
      {
        "kind": "LocalArgument",
        "name": "activeObjectId",
        "type": "Uuid!",
        "defaultValue": null
      },
      {
        "kind": "LocalArgument",
        "name": "existsActiveObject",
        "type": "Boolean!",
        "defaultValue": null
      },
      {
        "kind": "LocalArgument",
        "name": "existsUrlFromTOId",
        "type": "Boolean!",
        "defaultValue": null
      },
      {
        "kind": "LocalArgument",
        "name": "urlFromTOId",
        "type": "Uuid!",
        "defaultValue": null
      },
      {
        "kind": "LocalArgument",
        "name": "existsTreeFilterText",
        "type": "Boolean!",
        "defaultValue": null
      },
      {
        "kind": "LocalArgument",
        "name": "treeFilterText",
        "type": "String!",
        "defaultValue": null
      },
      {
        "kind": "LocalArgument",
        "name": "queryGroups",
        "type": "Boolean!",
        "defaultValue": null
      },
      {
        "kind": "LocalArgument",
        "name": "queryExportCategories",
        "type": "Boolean!",
        "defaultValue": null
      },
      {
        "kind": "LocalArgument",
        "name": "exportCategories",
        "type": "[String]",
        "defaultValue": null
      }
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "AppQueryQuery",
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "args": null,
        "concreteType": "CategoriesConnection",
        "name": "allCategories",
        "plural": false,
        "selections": [
          {
            "kind": "ScalarField",
            "alias": null,
            "args": null,
            "name": "totalCount",
            "storageKey": null
          }
        ],
        "storageKey": null
      },
      {
        "kind": "LinkedField",
        "alias": null,
        "args": null,
        "concreteType": "PropertyCollectionsConnection",
        "name": "allPropertyCollections",
        "plural": false,
        "selections": [
          {
            "kind": "ScalarField",
            "alias": null,
            "args": null,
            "name": "totalCount",
            "storageKey": null
          }
        ],
        "storageKey": null
      },
      {
        "kind": "Condition",
        "passingValue": true,
        "condition": "existsLevel7",
        "selections": [
          {
            "kind": "LinkedField",
            "alias": "level7Taxonomy",
            "args": [
              {
                "kind": "Variable",
                "name": "id",
                "variableName": "level7Taxonomy",
                "type": "Uuid!"
              }
            ],
            "concreteType": "Object",
            "name": "objectById",
            "plural": false,
            "selections": [
              {
                "kind": "LinkedField",
                "alias": null,
                "args": null,
                "concreteType": "ObjectsConnection",
                "name": "objectsByParentId",
                "plural": false,
                "selections": [
                  {
                    "kind": "LinkedField",
                    "alias": null,
                    "args": null,
                    "concreteType": "Object",
                    "name": "nodes",
                    "plural": true,
                    "selections": [
                      {
                        "kind": "ScalarField",
                        "alias": null,
                        "args": null,
                        "name": "id",
                        "storageKey": null
                      },
                      {
                        "kind": "ScalarField",
                        "alias": null,
                        "args": null,
                        "name": "name",
                        "storageKey": null
                      },
                      {
                        "kind": "LinkedField",
                        "alias": null,
                        "args": null,
                        "concreteType": "ObjectsConnection",
                        "name": "objectsByParentId",
                        "plural": false,
                        "selections": [
                          {
                            "kind": "ScalarField",
                            "alias": null,
                            "args": null,
                            "name": "totalCount",
                            "storageKey": null
                          }
                        ],
                        "storageKey": null
                      }
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": null
              }
            ],
            "storageKey": null
          }
        ]
      },
      {
        "kind": "Condition",
        "passingValue": true,
        "condition": "existsLevel9",
        "selections": [
          {
            "kind": "LinkedField",
            "alias": "level9Taxonomy",
            "args": [
              {
                "kind": "Variable",
                "name": "id",
                "variableName": "level9Taxonomy",
                "type": "Uuid!"
              }
            ],
            "concreteType": "Object",
            "name": "objectById",
            "plural": false,
            "selections": [
              {
                "kind": "LinkedField",
                "alias": null,
                "args": null,
                "concreteType": "ObjectsConnection",
                "name": "objectsByParentId",
                "plural": false,
                "selections": [
                  {
                    "kind": "LinkedField",
                    "alias": null,
                    "args": null,
                    "concreteType": "Object",
                    "name": "nodes",
                    "plural": true,
                    "selections": [
                      {
                        "kind": "ScalarField",
                        "alias": null,
                        "args": null,
                        "name": "id",
                        "storageKey": null
                      },
                      {
                        "kind": "ScalarField",
                        "alias": null,
                        "args": null,
                        "name": "name",
                        "storageKey": null
                      },
                      {
                        "kind": "LinkedField",
                        "alias": null,
                        "args": null,
                        "concreteType": "ObjectsConnection",
                        "name": "objectsByParentId",
                        "plural": false,
                        "selections": [
                          {
                            "kind": "ScalarField",
                            "alias": null,
                            "args": null,
                            "name": "totalCount",
                            "storageKey": null
                          }
                        ],
                        "storageKey": null
                      }
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": null
              }
            ],
            "storageKey": null
          }
        ]
      },
      {
        "kind": "Condition",
        "passingValue": true,
        "condition": "queryExportCategories",
        "selections": [
          {
            "kind": "LinkedField",
            "alias": null,
            "args": [
              {
                "kind": "Variable",
                "name": "categories",
                "variableName": "exportCategories",
                "type": "[String]"
              }
            ],
            "concreteType": "PcoPropertiesByCategoriesFunctionConnection",
            "name": "pcoPropertiesByCategoriesFunction",
            "plural": false,
            "selections": [
              {
                "kind": "LinkedField",
                "alias": null,
                "args": null,
                "concreteType": "PcoPropertiesByCategory",
                "name": "nodes",
                "plural": true,
                "selections": [
                  {
                    "kind": "ScalarField",
                    "alias": null,
                    "args": null,
                    "name": "propertyCollectionName",
                    "storageKey": null
                  },
                  {
                    "kind": "ScalarField",
                    "alias": null,
                    "args": null,
                    "name": "propertyName",
                    "storageKey": null
                  },
                  {
                    "kind": "ScalarField",
                    "alias": null,
                    "args": null,
                    "name": "jsontype",
                    "storageKey": null
                  },
                  {
                    "kind": "ScalarField",
                    "alias": null,
                    "args": null,
                    "name": "count",
                    "storageKey": null
                  }
                ],
                "storageKey": null
              }
            ],
            "storageKey": null
          }
        ]
      },
      {
        "kind": "Condition",
        "passingValue": true,
        "condition": "existsLevel10",
        "selections": [
          {
            "kind": "LinkedField",
            "alias": "level10Taxonomy",
            "args": [
              {
                "kind": "Variable",
                "name": "id",
                "variableName": "level10Taxonomy",
                "type": "Uuid!"
              }
            ],
            "concreteType": "Object",
            "name": "objectById",
            "plural": false,
            "selections": [
              {
                "kind": "LinkedField",
                "alias": null,
                "args": null,
                "concreteType": "ObjectsConnection",
                "name": "objectsByParentId",
                "plural": false,
                "selections": [
                  {
                    "kind": "LinkedField",
                    "alias": null,
                    "args": null,
                    "concreteType": "Object",
                    "name": "nodes",
                    "plural": true,
                    "selections": [
                      {
                        "kind": "ScalarField",
                        "alias": null,
                        "args": null,
                        "name": "id",
                        "storageKey": null
                      },
                      {
                        "kind": "ScalarField",
                        "alias": null,
                        "args": null,
                        "name": "name",
                        "storageKey": null
                      },
                      {
                        "kind": "LinkedField",
                        "alias": null,
                        "args": null,
                        "concreteType": "ObjectsConnection",
                        "name": "objectsByParentId",
                        "plural": false,
                        "selections": [
                          {
                            "kind": "ScalarField",
                            "alias": null,
                            "args": null,
                            "name": "totalCount",
                            "storageKey": null
                          }
                        ],
                        "storageKey": null
                      }
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": null
              }
            ],
            "storageKey": null
          }
        ]
      },
      {
        "kind": "Condition",
        "passingValue": true,
        "condition": "existsLevel2Taxonomy",
        "selections": [
          {
            "kind": "LinkedField",
            "alias": "level2Taxonomy",
            "args": null,
            "concreteType": "CategoriesOfTaxonomiesFunctionConnection",
            "name": "categoriesOfTaxonomiesFunction",
            "plural": false,
            "selections": [
              {
                "kind": "LinkedField",
                "alias": null,
                "args": null,
                "concreteType": "CategoriesOfTaxonomy",
                "name": "nodes",
                "plural": true,
                "selections": [
                  {
                    "kind": "ScalarField",
                    "alias": null,
                    "args": null,
                    "name": "name",
                    "storageKey": null
                  },
                  {
                    "kind": "ScalarField",
                    "alias": null,
                    "args": null,
                    "name": "id",
                    "storageKey": null
                  },
                  {
                    "kind": "ScalarField",
                    "alias": null,
                    "args": null,
                    "name": "count",
                    "storageKey": null
                  }
                ],
                "storageKey": null
              }
            ],
            "storageKey": null
          }
        ]
      },
      {
        "kind": "Condition",
        "passingValue": true,
        "condition": "existsLevel4",
        "selections": [
          {
            "kind": "LinkedField",
            "alias": "level4Taxonomy",
            "args": [
              {
                "kind": "Variable",
                "name": "id",
                "variableName": "level4Taxonomy",
                "type": "Uuid!"
              }
            ],
            "concreteType": "Taxonomy",
            "name": "taxonomyById",
            "plural": false,
            "selections": [
              {
                "kind": "LinkedField",
                "alias": null,
                "args": [
                  {
                    "kind": "Variable",
                    "name": "taxonomyId",
                    "variableName": "level4TaxonomyPossibleNull",
                    "type": "Uuid"
                  }
                ],
                "concreteType": "TaxonomyObjectLevel1Connection",
                "name": "objectLevel1",
                "plural": false,
                "selections": [
                  {
                    "kind": "LinkedField",
                    "alias": null,
                    "args": null,
                    "concreteType": "Object",
                    "name": "nodes",
                    "plural": true,
                    "selections": [
                      {
                        "kind": "ScalarField",
                        "alias": null,
                        "args": null,
                        "name": "id",
                        "storageKey": null
                      },
                      {
                        "kind": "ScalarField",
                        "alias": null,
                        "args": null,
                        "name": "name",
                        "storageKey": null
                      },
                      {
                        "kind": "LinkedField",
                        "alias": null,
                        "args": null,
                        "concreteType": "ObjectsConnection",
                        "name": "objectsByParentId",
                        "plural": false,
                        "selections": [
                          {
                            "kind": "ScalarField",
                            "alias": null,
                            "args": null,
                            "name": "totalCount",
                            "storageKey": null
                          }
                        ],
                        "storageKey": null
                      }
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": null
              }
            ],
            "storageKey": null
          }
        ]
      },
      {
        "kind": "Condition",
        "passingValue": true,
        "condition": "queryGroups",
        "selections": [
          {
            "kind": "LinkedField",
            "alias": null,
            "args": null,
            "concreteType": "CategoriesConnection",
            "name": "allCategories",
            "plural": false,
            "selections": [
              {
                "kind": "LinkedField",
                "alias": null,
                "args": null,
                "concreteType": "Category",
                "name": "nodes",
                "plural": true,
                "selections": [
                  {
                    "kind": "ScalarField",
                    "alias": null,
                    "args": null,
                    "name": "name",
                    "storageKey": null
                  }
                ],
                "storageKey": null
              }
            ],
            "storageKey": null
          }
        ]
      },
      {
        "kind": "Condition",
        "passingValue": true,
        "condition": "existsTreeFilterText",
        "selections": [
          {
            "kind": "LinkedField",
            "alias": "filterSuggestionsPC",
            "args": [
              {
                "kind": "Variable",
                "name": "propertyName",
                "variableName": "treeFilterText",
                "type": "String"
              }
            ],
            "concreteType": "PropertyCollectionByPropertyNameConnection",
            "name": "propertyCollectionByPropertyName",
            "plural": false,
            "selections": [
              {
                "kind": "ScalarField",
                "alias": null,
                "args": null,
                "name": "totalCount",
                "storageKey": null
              },
              {
                "kind": "LinkedField",
                "alias": null,
                "args": null,
                "concreteType": "PropertyCollection",
                "name": "nodes",
                "plural": true,
                "selections": [
                  {
                    "kind": "ScalarField",
                    "alias": null,
                    "args": null,
                    "name": "id",
                    "storageKey": null
                  },
                  {
                    "kind": "ScalarField",
                    "alias": null,
                    "args": null,
                    "name": "name",
                    "storageKey": null
                  }
                ],
                "storageKey": null
              }
            ],
            "storageKey": null
          },
          {
            "kind": "LinkedField",
            "alias": "filterSuggestionsTO",
            "args": [
              {
                "kind": "Variable",
                "name": "objectName",
                "variableName": "treeFilterText",
                "type": "String"
              }
            ],
            "concreteType": "ObjectByObjectNameConnection",
            "name": "objectByObjectName",
            "plural": false,
            "selections": [
              {
                "kind": "ScalarField",
                "alias": null,
                "args": null,
                "name": "totalCount",
                "storageKey": null
              },
              {
                "kind": "LinkedField",
                "alias": null,
                "args": null,
                "concreteType": "Object",
                "name": "nodes",
                "plural": true,
                "selections": [
                  {
                    "kind": "ScalarField",
                    "alias": null,
                    "args": null,
                    "name": "id",
                    "storageKey": null
                  },
                  {
                    "kind": "ScalarField",
                    "alias": null,
                    "args": null,
                    "name": "name",
                    "storageKey": null
                  }
                ],
                "storageKey": null
              }
            ],
            "storageKey": null
          }
        ]
      },
      {
        "kind": "Condition",
        "passingValue": true,
        "condition": "existsUrlFromTOId",
        "selections": [
          {
            "kind": "LinkedField",
            "alias": "urlFromTO",
            "args": [
              {
                "kind": "Variable",
                "name": "id",
                "variableName": "urlFromTOId",
                "type": "Uuid!"
              }
            ],
            "concreteType": "Object",
            "name": "objectById",
            "plural": false,
            "selections": [
              {
                "kind": "ScalarField",
                "alias": null,
                "args": null,
                "name": "id",
                "storageKey": null
              },
              {
                "kind": "LinkedField",
                "alias": null,
                "args": null,
                "concreteType": "Category",
                "name": "categoryByCategory",
                "plural": false,
                "selections": [
                  {
                    "kind": "ScalarField",
                    "alias": null,
                    "args": null,
                    "name": "name",
                    "storageKey": null
                  },
                  {
                    "kind": "ScalarField",
                    "alias": null,
                    "args": null,
                    "name": "dataType",
                    "storageKey": null
                  }
                ],
                "storageKey": null
              },
              {
                "kind": "LinkedField",
                "alias": null,
                "args": null,
                "concreteType": "Object",
                "name": "objectByParentId",
                "plural": false,
                "selections": [
                  {
                    "kind": "ScalarField",
                    "alias": null,
                    "args": null,
                    "name": "id",
                    "storageKey": null
                  },
                  {
                    "kind": "LinkedField",
                    "alias": null,
                    "args": null,
                    "concreteType": "Object",
                    "name": "objectByParentId",
                    "plural": false,
                    "selections": [
                      {
                        "kind": "ScalarField",
                        "alias": null,
                        "args": null,
                        "name": "id",
                        "storageKey": null
                      },
                      {
                        "kind": "LinkedField",
                        "alias": null,
                        "args": null,
                        "concreteType": "Object",
                        "name": "objectByParentId",
                        "plural": false,
                        "selections": [
                          {
                            "kind": "ScalarField",
                            "alias": null,
                            "args": null,
                            "name": "id",
                            "storageKey": null
                          },
                          {
                            "kind": "LinkedField",
                            "alias": null,
                            "args": null,
                            "concreteType": "Object",
                            "name": "objectByParentId",
                            "plural": false,
                            "selections": [
                              {
                                "kind": "ScalarField",
                                "alias": null,
                                "args": null,
                                "name": "id",
                                "storageKey": null
                              },
                              {
                                "kind": "LinkedField",
                                "alias": null,
                                "args": null,
                                "concreteType": "Object",
                                "name": "objectByParentId",
                                "plural": false,
                                "selections": [
                                  {
                                    "kind": "ScalarField",
                                    "alias": null,
                                    "args": null,
                                    "name": "id",
                                    "storageKey": null
                                  },
                                  {
                                    "kind": "LinkedField",
                                    "alias": null,
                                    "args": null,
                                    "concreteType": "Object",
                                    "name": "objectByParentId",
                                    "plural": false,
                                    "selections": [
                                      {
                                        "kind": "ScalarField",
                                        "alias": null,
                                        "args": null,
                                        "name": "id",
                                        "storageKey": null
                                      }
                                    ],
                                    "storageKey": null
                                  }
                                ],
                                "storageKey": null
                              }
                            ],
                            "storageKey": null
                          }
                        ],
                        "storageKey": null
                      }
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": null
              },
              {
                "kind": "LinkedField",
                "alias": null,
                "args": null,
                "concreteType": "Taxonomy",
                "name": "taxonomyByTaxonomyId",
                "plural": false,
                "selections": [
                  {
                    "kind": "ScalarField",
                    "alias": null,
                    "args": null,
                    "name": "id",
                    "storageKey": null
                  }
                ],
                "storageKey": null
              }
            ],
            "storageKey": null
          }
        ]
      },
      {
        "kind": "Condition",
        "passingValue": true,
        "condition": "existsActiveObject",
        "selections": [
          {
            "kind": "LinkedField",
            "alias": "activeObject",
            "args": [
              {
                "kind": "Variable",
                "name": "id",
                "variableName": "activeObjectId",
                "type": "Uuid!"
              }
            ],
            "concreteType": "Object",
            "name": "objectById",
            "plural": false,
            "selections": [
              {
                "kind": "FragmentSpread",
                "name": "Objekt_activeObject",
                "args": null
              }
            ],
            "storageKey": null
          }
        ]
      },
      {
        "kind": "Condition",
        "passingValue": true,
        "condition": "existsLevel5",
        "selections": [
          {
            "kind": "LinkedField",
            "alias": "level5Taxonomy",
            "args": [
              {
                "kind": "Variable",
                "name": "id",
                "variableName": "level5Taxonomy",
                "type": "Uuid!"
              }
            ],
            "concreteType": "Object",
            "name": "objectById",
            "plural": false,
            "selections": [
              {
                "kind": "LinkedField",
                "alias": null,
                "args": null,
                "concreteType": "ObjectsConnection",
                "name": "objectsByParentId",
                "plural": false,
                "selections": [
                  {
                    "kind": "LinkedField",
                    "alias": null,
                    "args": null,
                    "concreteType": "Object",
                    "name": "nodes",
                    "plural": true,
                    "selections": [
                      {
                        "kind": "ScalarField",
                        "alias": null,
                        "args": null,
                        "name": "id",
                        "storageKey": null
                      },
                      {
                        "kind": "ScalarField",
                        "alias": null,
                        "args": null,
                        "name": "name",
                        "storageKey": null
                      },
                      {
                        "kind": "LinkedField",
                        "alias": null,
                        "args": null,
                        "concreteType": "ObjectsConnection",
                        "name": "objectsByParentId",
                        "plural": false,
                        "selections": [
                          {
                            "kind": "ScalarField",
                            "alias": null,
                            "args": null,
                            "name": "totalCount",
                            "storageKey": null
                          }
                        ],
                        "storageKey": null
                      }
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": null
              }
            ],
            "storageKey": null
          }
        ]
      },
      {
        "kind": "Condition",
        "passingValue": true,
        "condition": "existsLevel3",
        "selections": [
          {
            "kind": "LinkedField",
            "alias": "level3Taxonomy",
            "args": [
              {
                "kind": "Variable",
                "name": "category",
                "variableName": "level3Taxonomy",
                "type": "String"
              }
            ],
            "concreteType": "TaxonomiesOfCategoryConnection",
            "name": "taxonomiesOfCategory",
            "plural": false,
            "selections": [
              {
                "kind": "LinkedField",
                "alias": null,
                "args": null,
                "concreteType": "Taxonomy",
                "name": "nodes",
                "plural": true,
                "selections": [
                  {
                    "kind": "ScalarField",
                    "alias": null,
                    "args": null,
                    "name": "id",
                    "storageKey": null
                  },
                  {
                    "kind": "ScalarField",
                    "alias": null,
                    "args": null,
                    "name": "name",
                    "storageKey": null
                  },
                  {
                    "kind": "LinkedField",
                    "alias": null,
                    "args": [
                      {
                        "kind": "Variable",
                        "name": "taxonomyId",
                        "variableName": "level4TaxonomyPossibleNull",
                        "type": "Uuid"
                      }
                    ],
                    "concreteType": "TaxonomyObjectLevel1Connection",
                    "name": "objectLevel1",
                    "plural": false,
                    "selections": [
                      {
                        "kind": "ScalarField",
                        "alias": null,
                        "args": null,
                        "name": "totalCount",
                        "storageKey": null
                      }
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": null
              }
            ],
            "storageKey": null
          }
        ]
      },
      {
        "kind": "Condition",
        "passingValue": true,
        "condition": "existsLevel8",
        "selections": [
          {
            "kind": "LinkedField",
            "alias": "level8Taxonomy",
            "args": [
              {
                "kind": "Variable",
                "name": "id",
                "variableName": "level8Taxonomy",
                "type": "Uuid!"
              }
            ],
            "concreteType": "Object",
            "name": "objectById",
            "plural": false,
            "selections": [
              {
                "kind": "LinkedField",
                "alias": null,
                "args": null,
                "concreteType": "ObjectsConnection",
                "name": "objectsByParentId",
                "plural": false,
                "selections": [
                  {
                    "kind": "LinkedField",
                    "alias": null,
                    "args": null,
                    "concreteType": "Object",
                    "name": "nodes",
                    "plural": true,
                    "selections": [
                      {
                        "kind": "ScalarField",
                        "alias": null,
                        "args": null,
                        "name": "id",
                        "storageKey": null
                      },
                      {
                        "kind": "ScalarField",
                        "alias": null,
                        "args": null,
                        "name": "name",
                        "storageKey": null
                      },
                      {
                        "kind": "LinkedField",
                        "alias": null,
                        "args": null,
                        "concreteType": "ObjectsConnection",
                        "name": "objectsByParentId",
                        "plural": false,
                        "selections": [
                          {
                            "kind": "ScalarField",
                            "alias": null,
                            "args": null,
                            "name": "totalCount",
                            "storageKey": null
                          }
                        ],
                        "storageKey": null
                      }
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": null
              }
            ],
            "storageKey": null
          }
        ]
      },
      {
        "kind": "Condition",
        "passingValue": true,
        "condition": "existsLevel2Pc",
        "selections": [
          {
            "kind": "LinkedField",
            "alias": null,
            "args": null,
            "concreteType": "PropertyCollectionsConnection",
            "name": "allPropertyCollections",
            "plural": false,
            "selections": [
              {
                "kind": "LinkedField",
                "alias": null,
                "args": null,
                "concreteType": "PropertyCollection",
                "name": "nodes",
                "plural": true,
                "selections": [
                  {
                    "kind": "ScalarField",
                    "alias": null,
                    "args": null,
                    "name": "id",
                    "storageKey": null
                  },
                  {
                    "kind": "ScalarField",
                    "alias": null,
                    "args": null,
                    "name": "name",
                    "storageKey": null
                  },
                  {
                    "kind": "LinkedField",
                    "alias": null,
                    "args": null,
                    "concreteType": "PropertyCollectionObjectsConnection",
                    "name": "propertyCollectionObjectsByPropertyCollectionId",
                    "plural": false,
                    "selections": [
                      {
                        "kind": "ScalarField",
                        "alias": null,
                        "args": null,
                        "name": "totalCount",
                        "storageKey": null
                      }
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": null
              }
            ],
            "storageKey": null
          }
        ]
      },
      {
        "kind": "Condition",
        "passingValue": true,
        "condition": "existsLevel6",
        "selections": [
          {
            "kind": "LinkedField",
            "alias": "level6Taxonomy",
            "args": [
              {
                "kind": "Variable",
                "name": "id",
                "variableName": "level6Taxonomy",
                "type": "Uuid!"
              }
            ],
            "concreteType": "Object",
            "name": "objectById",
            "plural": false,
            "selections": [
              {
                "kind": "LinkedField",
                "alias": null,
                "args": null,
                "concreteType": "ObjectsConnection",
                "name": "objectsByParentId",
                "plural": false,
                "selections": [
                  {
                    "kind": "LinkedField",
                    "alias": null,
                    "args": null,
                    "concreteType": "Object",
                    "name": "nodes",
                    "plural": true,
                    "selections": [
                      {
                        "kind": "ScalarField",
                        "alias": null,
                        "args": null,
                        "name": "id",
                        "storageKey": null
                      },
                      {
                        "kind": "ScalarField",
                        "alias": null,
                        "args": null,
                        "name": "name",
                        "storageKey": null
                      },
                      {
                        "kind": "LinkedField",
                        "alias": null,
                        "args": null,
                        "concreteType": "ObjectsConnection",
                        "name": "objectsByParentId",
                        "plural": false,
                        "selections": [
                          {
                            "kind": "ScalarField",
                            "alias": null,
                            "args": null,
                            "name": "totalCount",
                            "storageKey": null
                          }
                        ],
                        "storageKey": null
                      }
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": null
              }
            ],
            "storageKey": null
          }
        ]
      }
    ],
    "type": "Query"
  },
  "id": null,
  "kind": "Batch",
  "metadata": {},
  "name": "AppQueryQuery",
  "query": {
    "argumentDefinitions": [
      {
        "kind": "LocalArgument",
        "name": "existsLevel2Pc",
        "type": "Boolean!",
        "defaultValue": null
      },
      {
        "kind": "LocalArgument",
        "name": "existsLevel2Taxonomy",
        "type": "Boolean!",
        "defaultValue": null
      },
      {
        "kind": "LocalArgument",
        "name": "existsLevel3",
        "type": "Boolean!",
        "defaultValue": null
      },
      {
        "kind": "LocalArgument",
        "name": "level3Taxonomy",
        "type": "String!",
        "defaultValue": null
      },
      {
        "kind": "LocalArgument",
        "name": "existsLevel4",
        "type": "Boolean!",
        "defaultValue": null
      },
      {
        "kind": "LocalArgument",
        "name": "level4Taxonomy",
        "type": "Uuid!",
        "defaultValue": null
      },
      {
        "kind": "LocalArgument",
        "name": "level4TaxonomyPossibleNull",
        "type": "Uuid",
        "defaultValue": null
      },
      {
        "kind": "LocalArgument",
        "name": "existsLevel5",
        "type": "Boolean!",
        "defaultValue": null
      },
      {
        "kind": "LocalArgument",
        "name": "level5Taxonomy",
        "type": "Uuid!",
        "defaultValue": null
      },
      {
        "kind": "LocalArgument",
        "name": "existsLevel6",
        "type": "Boolean!",
        "defaultValue": null
      },
      {
        "kind": "LocalArgument",
        "name": "level6Taxonomy",
        "type": "Uuid!",
        "defaultValue": null
      },
      {
        "kind": "LocalArgument",
        "name": "existsLevel7",
        "type": "Boolean!",
        "defaultValue": null
      },
      {
        "kind": "LocalArgument",
        "name": "level7Taxonomy",
        "type": "Uuid!",
        "defaultValue": null
      },
      {
        "kind": "LocalArgument",
        "name": "existsLevel8",
        "type": "Boolean!",
        "defaultValue": null
      },
      {
        "kind": "LocalArgument",
        "name": "level8Taxonomy",
        "type": "Uuid!",
        "defaultValue": null
      },
      {
        "kind": "LocalArgument",
        "name": "existsLevel9",
        "type": "Boolean!",
        "defaultValue": null
      },
      {
        "kind": "LocalArgument",
        "name": "level9Taxonomy",
        "type": "Uuid!",
        "defaultValue": null
      },
      {
        "kind": "LocalArgument",
        "name": "existsLevel10",
        "type": "Boolean!",
        "defaultValue": null
      },
      {
        "kind": "LocalArgument",
        "name": "level10Taxonomy",
        "type": "Uuid!",
        "defaultValue": null
      },
      {
        "kind": "LocalArgument",
        "name": "activeObjectId",
        "type": "Uuid!",
        "defaultValue": null
      },
      {
        "kind": "LocalArgument",
        "name": "existsActiveObject",
        "type": "Boolean!",
        "defaultValue": null
      },
      {
        "kind": "LocalArgument",
        "name": "existsUrlFromTOId",
        "type": "Boolean!",
        "defaultValue": null
      },
      {
        "kind": "LocalArgument",
        "name": "urlFromTOId",
        "type": "Uuid!",
        "defaultValue": null
      },
      {
        "kind": "LocalArgument",
        "name": "existsTreeFilterText",
        "type": "Boolean!",
        "defaultValue": null
      },
      {
        "kind": "LocalArgument",
        "name": "treeFilterText",
        "type": "String!",
        "defaultValue": null
      },
      {
        "kind": "LocalArgument",
        "name": "queryGroups",
        "type": "Boolean!",
        "defaultValue": null
      },
      {
        "kind": "LocalArgument",
        "name": "queryExportCategories",
        "type": "Boolean!",
        "defaultValue": null
      },
      {
        "kind": "LocalArgument",
        "name": "exportCategories",
        "type": "[String]",
        "defaultValue": null
      }
    ],
    "kind": "Root",
    "name": "AppQueryQuery",
    "operation": "query",
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "args": null,
        "concreteType": "CategoriesConnection",
        "name": "allCategories",
        "plural": false,
        "selections": [
          {
            "kind": "ScalarField",
            "alias": null,
            "args": null,
            "name": "totalCount",
            "storageKey": null
          }
        ],
        "storageKey": null
      },
      {
        "kind": "LinkedField",
        "alias": null,
        "args": null,
        "concreteType": "PropertyCollectionsConnection",
        "name": "allPropertyCollections",
        "plural": false,
        "selections": [
          {
            "kind": "ScalarField",
            "alias": null,
            "args": null,
            "name": "totalCount",
            "storageKey": null
          }
        ],
        "storageKey": null
      },
      {
        "kind": "Condition",
        "passingValue": true,
        "condition": "existsLevel7",
        "selections": [
          {
            "kind": "LinkedField",
            "alias": "level7Taxonomy",
            "args": [
              {
                "kind": "Variable",
                "name": "id",
                "variableName": "level7Taxonomy",
                "type": "Uuid!"
              }
            ],
            "concreteType": "Object",
            "name": "objectById",
            "plural": false,
            "selections": [
              {
                "kind": "LinkedField",
                "alias": null,
                "args": null,
                "concreteType": "ObjectsConnection",
                "name": "objectsByParentId",
                "plural": false,
                "selections": [
                  {
                    "kind": "LinkedField",
                    "alias": null,
                    "args": null,
                    "concreteType": "Object",
                    "name": "nodes",
                    "plural": true,
                    "selections": [
                      {
                        "kind": "ScalarField",
                        "alias": null,
                        "args": null,
                        "name": "id",
                        "storageKey": null
                      },
                      {
                        "kind": "ScalarField",
                        "alias": null,
                        "args": null,
                        "name": "name",
                        "storageKey": null
                      },
                      {
                        "kind": "LinkedField",
                        "alias": null,
                        "args": null,
                        "concreteType": "ObjectsConnection",
                        "name": "objectsByParentId",
                        "plural": false,
                        "selections": [
                          {
                            "kind": "ScalarField",
                            "alias": null,
                            "args": null,
                            "name": "totalCount",
                            "storageKey": null
                          }
                        ],
                        "storageKey": null
                      }
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": null
              }
            ],
            "storageKey": null
          }
        ]
      },
      {
        "kind": "Condition",
        "passingValue": true,
        "condition": "existsLevel9",
        "selections": [
          {
            "kind": "LinkedField",
            "alias": "level9Taxonomy",
            "args": [
              {
                "kind": "Variable",
                "name": "id",
                "variableName": "level9Taxonomy",
                "type": "Uuid!"
              }
            ],
            "concreteType": "Object",
            "name": "objectById",
            "plural": false,
            "selections": [
              {
                "kind": "LinkedField",
                "alias": null,
                "args": null,
                "concreteType": "ObjectsConnection",
                "name": "objectsByParentId",
                "plural": false,
                "selections": [
                  {
                    "kind": "LinkedField",
                    "alias": null,
                    "args": null,
                    "concreteType": "Object",
                    "name": "nodes",
                    "plural": true,
                    "selections": [
                      {
                        "kind": "ScalarField",
                        "alias": null,
                        "args": null,
                        "name": "id",
                        "storageKey": null
                      },
                      {
                        "kind": "ScalarField",
                        "alias": null,
                        "args": null,
                        "name": "name",
                        "storageKey": null
                      },
                      {
                        "kind": "LinkedField",
                        "alias": null,
                        "args": null,
                        "concreteType": "ObjectsConnection",
                        "name": "objectsByParentId",
                        "plural": false,
                        "selections": [
                          {
                            "kind": "ScalarField",
                            "alias": null,
                            "args": null,
                            "name": "totalCount",
                            "storageKey": null
                          }
                        ],
                        "storageKey": null
                      }
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": null
              }
            ],
            "storageKey": null
          }
        ]
      },
      {
        "kind": "Condition",
        "passingValue": true,
        "condition": "queryExportCategories",
        "selections": [
          {
            "kind": "LinkedField",
            "alias": null,
            "args": [
              {
                "kind": "Variable",
                "name": "categories",
                "variableName": "exportCategories",
                "type": "[String]"
              }
            ],
            "concreteType": "PcoPropertiesByCategoriesFunctionConnection",
            "name": "pcoPropertiesByCategoriesFunction",
            "plural": false,
            "selections": [
              {
                "kind": "LinkedField",
                "alias": null,
                "args": null,
                "concreteType": "PcoPropertiesByCategory",
                "name": "nodes",
                "plural": true,
                "selections": [
                  {
                    "kind": "ScalarField",
                    "alias": null,
                    "args": null,
                    "name": "propertyCollectionName",
                    "storageKey": null
                  },
                  {
                    "kind": "ScalarField",
                    "alias": null,
                    "args": null,
                    "name": "propertyName",
                    "storageKey": null
                  },
                  {
                    "kind": "ScalarField",
                    "alias": null,
                    "args": null,
                    "name": "jsontype",
                    "storageKey": null
                  },
                  {
                    "kind": "ScalarField",
                    "alias": null,
                    "args": null,
                    "name": "count",
                    "storageKey": null
                  }
                ],
                "storageKey": null
              }
            ],
            "storageKey": null
          }
        ]
      },
      {
        "kind": "Condition",
        "passingValue": true,
        "condition": "existsLevel10",
        "selections": [
          {
            "kind": "LinkedField",
            "alias": "level10Taxonomy",
            "args": [
              {
                "kind": "Variable",
                "name": "id",
                "variableName": "level10Taxonomy",
                "type": "Uuid!"
              }
            ],
            "concreteType": "Object",
            "name": "objectById",
            "plural": false,
            "selections": [
              {
                "kind": "LinkedField",
                "alias": null,
                "args": null,
                "concreteType": "ObjectsConnection",
                "name": "objectsByParentId",
                "plural": false,
                "selections": [
                  {
                    "kind": "LinkedField",
                    "alias": null,
                    "args": null,
                    "concreteType": "Object",
                    "name": "nodes",
                    "plural": true,
                    "selections": [
                      {
                        "kind": "ScalarField",
                        "alias": null,
                        "args": null,
                        "name": "id",
                        "storageKey": null
                      },
                      {
                        "kind": "ScalarField",
                        "alias": null,
                        "args": null,
                        "name": "name",
                        "storageKey": null
                      },
                      {
                        "kind": "LinkedField",
                        "alias": null,
                        "args": null,
                        "concreteType": "ObjectsConnection",
                        "name": "objectsByParentId",
                        "plural": false,
                        "selections": [
                          {
                            "kind": "ScalarField",
                            "alias": null,
                            "args": null,
                            "name": "totalCount",
                            "storageKey": null
                          }
                        ],
                        "storageKey": null
                      }
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": null
              }
            ],
            "storageKey": null
          }
        ]
      },
      {
        "kind": "Condition",
        "passingValue": true,
        "condition": "existsLevel2Taxonomy",
        "selections": [
          {
            "kind": "LinkedField",
            "alias": "level2Taxonomy",
            "args": null,
            "concreteType": "CategoriesOfTaxonomiesFunctionConnection",
            "name": "categoriesOfTaxonomiesFunction",
            "plural": false,
            "selections": [
              {
                "kind": "LinkedField",
                "alias": null,
                "args": null,
                "concreteType": "CategoriesOfTaxonomy",
                "name": "nodes",
                "plural": true,
                "selections": [
                  {
                    "kind": "ScalarField",
                    "alias": null,
                    "args": null,
                    "name": "name",
                    "storageKey": null
                  },
                  {
                    "kind": "ScalarField",
                    "alias": null,
                    "args": null,
                    "name": "id",
                    "storageKey": null
                  },
                  {
                    "kind": "ScalarField",
                    "alias": null,
                    "args": null,
                    "name": "count",
                    "storageKey": null
                  }
                ],
                "storageKey": null
              }
            ],
            "storageKey": null
          }
        ]
      },
      {
        "kind": "Condition",
        "passingValue": true,
        "condition": "existsLevel4",
        "selections": [
          {
            "kind": "LinkedField",
            "alias": "level4Taxonomy",
            "args": [
              {
                "kind": "Variable",
                "name": "id",
                "variableName": "level4Taxonomy",
                "type": "Uuid!"
              }
            ],
            "concreteType": "Taxonomy",
            "name": "taxonomyById",
            "plural": false,
            "selections": [
              {
                "kind": "LinkedField",
                "alias": null,
                "args": [
                  {
                    "kind": "Variable",
                    "name": "taxonomyId",
                    "variableName": "level4TaxonomyPossibleNull",
                    "type": "Uuid"
                  }
                ],
                "concreteType": "TaxonomyObjectLevel1Connection",
                "name": "objectLevel1",
                "plural": false,
                "selections": [
                  {
                    "kind": "LinkedField",
                    "alias": null,
                    "args": null,
                    "concreteType": "Object",
                    "name": "nodes",
                    "plural": true,
                    "selections": [
                      {
                        "kind": "ScalarField",
                        "alias": null,
                        "args": null,
                        "name": "id",
                        "storageKey": null
                      },
                      {
                        "kind": "ScalarField",
                        "alias": null,
                        "args": null,
                        "name": "name",
                        "storageKey": null
                      },
                      {
                        "kind": "LinkedField",
                        "alias": null,
                        "args": null,
                        "concreteType": "ObjectsConnection",
                        "name": "objectsByParentId",
                        "plural": false,
                        "selections": [
                          {
                            "kind": "ScalarField",
                            "alias": null,
                            "args": null,
                            "name": "totalCount",
                            "storageKey": null
                          }
                        ],
                        "storageKey": null
                      }
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": null
              }
            ],
            "storageKey": null
          }
        ]
      },
      {
        "kind": "Condition",
        "passingValue": true,
        "condition": "queryGroups",
        "selections": [
          {
            "kind": "LinkedField",
            "alias": null,
            "args": null,
            "concreteType": "CategoriesConnection",
            "name": "allCategories",
            "plural": false,
            "selections": [
              {
                "kind": "LinkedField",
                "alias": null,
                "args": null,
                "concreteType": "Category",
                "name": "nodes",
                "plural": true,
                "selections": [
                  {
                    "kind": "ScalarField",
                    "alias": null,
                    "args": null,
                    "name": "name",
                    "storageKey": null
                  }
                ],
                "storageKey": null
              }
            ],
            "storageKey": null
          }
        ]
      },
      {
        "kind": "Condition",
        "passingValue": true,
        "condition": "existsTreeFilterText",
        "selections": [
          {
            "kind": "LinkedField",
            "alias": "filterSuggestionsPC",
            "args": [
              {
                "kind": "Variable",
                "name": "propertyName",
                "variableName": "treeFilterText",
                "type": "String"
              }
            ],
            "concreteType": "PropertyCollectionByPropertyNameConnection",
            "name": "propertyCollectionByPropertyName",
            "plural": false,
            "selections": [
              {
                "kind": "ScalarField",
                "alias": null,
                "args": null,
                "name": "totalCount",
                "storageKey": null
              },
              {
                "kind": "LinkedField",
                "alias": null,
                "args": null,
                "concreteType": "PropertyCollection",
                "name": "nodes",
                "plural": true,
                "selections": [
                  {
                    "kind": "ScalarField",
                    "alias": null,
                    "args": null,
                    "name": "id",
                    "storageKey": null
                  },
                  {
                    "kind": "ScalarField",
                    "alias": null,
                    "args": null,
                    "name": "name",
                    "storageKey": null
                  }
                ],
                "storageKey": null
              }
            ],
            "storageKey": null
          },
          {
            "kind": "LinkedField",
            "alias": "filterSuggestionsTO",
            "args": [
              {
                "kind": "Variable",
                "name": "objectName",
                "variableName": "treeFilterText",
                "type": "String"
              }
            ],
            "concreteType": "ObjectByObjectNameConnection",
            "name": "objectByObjectName",
            "plural": false,
            "selections": [
              {
                "kind": "ScalarField",
                "alias": null,
                "args": null,
                "name": "totalCount",
                "storageKey": null
              },
              {
                "kind": "LinkedField",
                "alias": null,
                "args": null,
                "concreteType": "Object",
                "name": "nodes",
                "plural": true,
                "selections": [
                  {
                    "kind": "ScalarField",
                    "alias": null,
                    "args": null,
                    "name": "id",
                    "storageKey": null
                  },
                  {
                    "kind": "ScalarField",
                    "alias": null,
                    "args": null,
                    "name": "name",
                    "storageKey": null
                  }
                ],
                "storageKey": null
              }
            ],
            "storageKey": null
          }
        ]
      },
      {
        "kind": "Condition",
        "passingValue": true,
        "condition": "existsUrlFromTOId",
        "selections": [
          {
            "kind": "LinkedField",
            "alias": "urlFromTO",
            "args": [
              {
                "kind": "Variable",
                "name": "id",
                "variableName": "urlFromTOId",
                "type": "Uuid!"
              }
            ],
            "concreteType": "Object",
            "name": "objectById",
            "plural": false,
            "selections": [
              {
                "kind": "ScalarField",
                "alias": null,
                "args": null,
                "name": "id",
                "storageKey": null
              },
              {
                "kind": "LinkedField",
                "alias": null,
                "args": null,
                "concreteType": "Category",
                "name": "categoryByCategory",
                "plural": false,
                "selections": [
                  {
                    "kind": "ScalarField",
                    "alias": null,
                    "args": null,
                    "name": "name",
                    "storageKey": null
                  },
                  {
                    "kind": "ScalarField",
                    "alias": null,
                    "args": null,
                    "name": "dataType",
                    "storageKey": null
                  }
                ],
                "storageKey": null
              },
              {
                "kind": "LinkedField",
                "alias": null,
                "args": null,
                "concreteType": "Object",
                "name": "objectByParentId",
                "plural": false,
                "selections": [
                  {
                    "kind": "ScalarField",
                    "alias": null,
                    "args": null,
                    "name": "id",
                    "storageKey": null
                  },
                  {
                    "kind": "LinkedField",
                    "alias": null,
                    "args": null,
                    "concreteType": "Object",
                    "name": "objectByParentId",
                    "plural": false,
                    "selections": [
                      {
                        "kind": "ScalarField",
                        "alias": null,
                        "args": null,
                        "name": "id",
                        "storageKey": null
                      },
                      {
                        "kind": "LinkedField",
                        "alias": null,
                        "args": null,
                        "concreteType": "Object",
                        "name": "objectByParentId",
                        "plural": false,
                        "selections": [
                          {
                            "kind": "ScalarField",
                            "alias": null,
                            "args": null,
                            "name": "id",
                            "storageKey": null
                          },
                          {
                            "kind": "LinkedField",
                            "alias": null,
                            "args": null,
                            "concreteType": "Object",
                            "name": "objectByParentId",
                            "plural": false,
                            "selections": [
                              {
                                "kind": "ScalarField",
                                "alias": null,
                                "args": null,
                                "name": "id",
                                "storageKey": null
                              },
                              {
                                "kind": "LinkedField",
                                "alias": null,
                                "args": null,
                                "concreteType": "Object",
                                "name": "objectByParentId",
                                "plural": false,
                                "selections": [
                                  {
                                    "kind": "ScalarField",
                                    "alias": null,
                                    "args": null,
                                    "name": "id",
                                    "storageKey": null
                                  },
                                  {
                                    "kind": "LinkedField",
                                    "alias": null,
                                    "args": null,
                                    "concreteType": "Object",
                                    "name": "objectByParentId",
                                    "plural": false,
                                    "selections": [
                                      {
                                        "kind": "ScalarField",
                                        "alias": null,
                                        "args": null,
                                        "name": "id",
                                        "storageKey": null
                                      }
                                    ],
                                    "storageKey": null
                                  }
                                ],
                                "storageKey": null
                              }
                            ],
                            "storageKey": null
                          }
                        ],
                        "storageKey": null
                      }
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": null
              },
              {
                "kind": "LinkedField",
                "alias": null,
                "args": null,
                "concreteType": "Taxonomy",
                "name": "taxonomyByTaxonomyId",
                "plural": false,
                "selections": [
                  {
                    "kind": "ScalarField",
                    "alias": null,
                    "args": null,
                    "name": "id",
                    "storageKey": null
                  }
                ],
                "storageKey": null
              }
            ],
            "storageKey": null
          }
        ]
      },
      {
        "kind": "Condition",
        "passingValue": true,
        "condition": "existsActiveObject",
        "selections": [
          {
            "kind": "LinkedField",
            "alias": "activeObject",
            "args": [
              {
                "kind": "Variable",
                "name": "id",
                "variableName": "activeObjectId",
                "type": "Uuid!"
              }
            ],
            "concreteType": "Object",
            "name": "objectById",
            "plural": false,
            "selections": [
              {
                "kind": "ScalarField",
                "alias": null,
                "args": null,
                "name": "category",
                "storageKey": null
              },
              {
                "kind": "ScalarField",
                "alias": null,
                "args": null,
                "name": "id",
                "storageKey": null
              },
              {
                "kind": "ScalarField",
                "alias": null,
                "args": null,
                "name": "parentId",
                "storageKey": null
              },
              {
                "kind": "ScalarField",
                "alias": null,
                "args": null,
                "name": "name",
                "storageKey": null
              },
              {
                "kind": "ScalarField",
                "alias": null,
                "args": null,
                "name": "properties",
                "storageKey": null
              },
              {
                "kind": "ScalarField",
                "alias": null,
                "args": null,
                "name": "taxonomyId",
                "storageKey": null
              },
              {
                "kind": "ScalarField",
                "alias": null,
                "args": null,
                "name": "idOld",
                "storageKey": null
              },
              {
                "kind": "LinkedField",
                "alias": null,
                "args": null,
                "concreteType": "SynonymsConnection",
                "name": "synonymsByObjectId",
                "plural": false,
                "selections": [
                  {
                    "kind": "ScalarField",
                    "alias": null,
                    "args": null,
                    "name": "totalCount",
                    "storageKey": null
                  },
                  {
                    "kind": "LinkedField",
                    "alias": null,
                    "args": null,
                    "concreteType": "Synonym",
                    "name": "nodes",
                    "plural": true,
                    "selections": [
                      {
                        "kind": "LinkedField",
                        "alias": null,
                        "args": null,
                        "concreteType": "Object",
                        "name": "objectByObjectIdSynonym",
                        "plural": false,
                        "selections": [
                          {
                            "kind": "ScalarField",
                            "alias": null,
                            "args": null,
                            "name": "id",
                            "storageKey": null
                          },
                          {
                            "kind": "ScalarField",
                            "alias": null,
                            "args": null,
                            "name": "taxonomyId",
                            "storageKey": null
                          },
                          {
                            "kind": "ScalarField",
                            "alias": null,
                            "args": null,
                            "name": "parentId",
                            "storageKey": null
                          },
                          {
                            "kind": "ScalarField",
                            "alias": null,
                            "args": null,
                            "name": "name",
                            "storageKey": null
                          },
                          {
                            "kind": "ScalarField",
                            "alias": null,
                            "args": null,
                            "name": "properties",
                            "storageKey": null
                          },
                          {
                            "kind": "ScalarField",
                            "alias": null,
                            "args": null,
                            "name": "category",
                            "storageKey": null
                          },
                          {
                            "kind": "ScalarField",
                            "alias": null,
                            "args": null,
                            "name": "idOld",
                            "storageKey": null
                          },
                          {
                            "kind": "LinkedField",
                            "alias": null,
                            "args": null,
                            "concreteType": "Taxonomy",
                            "name": "taxonomyByTaxonomyId",
                            "plural": false,
                            "selections": [
                              {
                                "kind": "ScalarField",
                                "alias": null,
                                "args": null,
                                "name": "name",
                                "storageKey": null
                              },
                              {
                                "kind": "ScalarField",
                                "alias": null,
                                "args": null,
                                "name": "importedBy",
                                "storageKey": null
                              },
                              {
                                "kind": "ScalarField",
                                "alias": null,
                                "args": null,
                                "name": "description",
                                "storageKey": null
                              },
                              {
                                "kind": "ScalarField",
                                "alias": null,
                                "args": null,
                                "name": "links",
                                "storageKey": null
                              },
                              {
                                "kind": "ScalarField",
                                "alias": null,
                                "args": null,
                                "name": "lastUpdated",
                                "storageKey": null
                              },
                              {
                                "kind": "ScalarField",
                                "alias": null,
                                "args": null,
                                "name": "isCategoryStandard",
                                "storageKey": null
                              },
                              {
                                "kind": "ScalarField",
                                "alias": null,
                                "args": null,
                                "name": "id",
                                "storageKey": null
                              },
                              {
                                "kind": "ScalarField",
                                "alias": null,
                                "args": null,
                                "name": "termsOfUse",
                                "storageKey": null
                              },
                              {
                                "kind": "ScalarField",
                                "alias": null,
                                "args": null,
                                "name": "habitatLabel",
                                "storageKey": null
                              },
                              {
                                "kind": "ScalarField",
                                "alias": null,
                                "args": null,
                                "name": "habitatComments",
                                "storageKey": null
                              },
                              {
                                "kind": "ScalarField",
                                "alias": null,
                                "args": null,
                                "name": "habitatNrFnsMin",
                                "storageKey": null
                              },
                              {
                                "kind": "ScalarField",
                                "alias": null,
                                "args": null,
                                "name": "habitatNrFnsMax",
                                "storageKey": null
                              },
                              {
                                "kind": "LinkedField",
                                "alias": null,
                                "args": null,
                                "concreteType": "Organization",
                                "name": "organizationByOrganizationId",
                                "plural": false,
                                "selections": [
                                  {
                                    "kind": "ScalarField",
                                    "alias": null,
                                    "args": null,
                                    "name": "id",
                                    "storageKey": null
                                  },
                                  {
                                    "kind": "ScalarField",
                                    "alias": null,
                                    "args": null,
                                    "name": "name",
                                    "storageKey": null
                                  }
                                ],
                                "storageKey": null
                              }
                            ],
                            "storageKey": null
                          },
                          {
                            "kind": "LinkedField",
                            "alias": null,
                            "args": null,
                            "concreteType": "PropertyCollectionObjectsConnection",
                            "name": "propertyCollectionObjectsByObjectId",
                            "plural": false,
                            "selections": [
                              {
                                "kind": "ScalarField",
                                "alias": null,
                                "args": null,
                                "name": "totalCount",
                                "storageKey": null
                              },
                              {
                                "kind": "LinkedField",
                                "alias": null,
                                "args": null,
                                "concreteType": "PropertyCollectionObject",
                                "name": "nodes",
                                "plural": true,
                                "selections": [
                                  {
                                    "kind": "ScalarField",
                                    "alias": null,
                                    "args": null,
                                    "name": "objectId",
                                    "storageKey": null
                                  },
                                  {
                                    "kind": "ScalarField",
                                    "alias": null,
                                    "args": null,
                                    "name": "propertyCollectionId",
                                    "storageKey": null
                                  },
                                  {
                                    "kind": "ScalarField",
                                    "alias": null,
                                    "args": null,
                                    "name": "properties",
                                    "storageKey": null
                                  },
                                  {
                                    "kind": "LinkedField",
                                    "alias": null,
                                    "args": null,
                                    "concreteType": "PropertyCollection",
                                    "name": "propertyCollectionByPropertyCollectionId",
                                    "plural": false,
                                    "selections": [
                                      {
                                        "kind": "ScalarField",
                                        "alias": null,
                                        "args": null,
                                        "name": "name",
                                        "storageKey": null
                                      },
                                      {
                                        "kind": "ScalarField",
                                        "alias": null,
                                        "args": null,
                                        "name": "description",
                                        "storageKey": null
                                      },
                                      {
                                        "kind": "ScalarField",
                                        "alias": null,
                                        "args": null,
                                        "name": "links",
                                        "storageKey": null
                                      },
                                      {
                                        "kind": "ScalarField",
                                        "alias": null,
                                        "args": null,
                                        "name": "combining",
                                        "storageKey": null
                                      },
                                      {
                                        "kind": "ScalarField",
                                        "alias": null,
                                        "args": null,
                                        "name": "lastUpdated",
                                        "storageKey": null
                                      },
                                      {
                                        "kind": "ScalarField",
                                        "alias": null,
                                        "args": null,
                                        "name": "termsOfUse",
                                        "storageKey": null
                                      },
                                      {
                                        "kind": "ScalarField",
                                        "alias": null,
                                        "args": null,
                                        "name": "importedBy",
                                        "storageKey": null
                                      },
                                      {
                                        "kind": "LinkedField",
                                        "alias": null,
                                        "args": null,
                                        "concreteType": "Organization",
                                        "name": "organizationByOrganizationId",
                                        "plural": false,
                                        "selections": [
                                          {
                                            "kind": "ScalarField",
                                            "alias": null,
                                            "args": null,
                                            "name": "name",
                                            "storageKey": null
                                          }
                                        ],
                                        "storageKey": null
                                      },
                                      {
                                        "kind": "LinkedField",
                                        "alias": null,
                                        "args": null,
                                        "concreteType": "User",
                                        "name": "userByImportedBy",
                                        "plural": false,
                                        "selections": [
                                          {
                                            "kind": "ScalarField",
                                            "alias": null,
                                            "args": null,
                                            "name": "name",
                                            "storageKey": null
                                          },
                                          {
                                            "kind": "ScalarField",
                                            "alias": null,
                                            "args": null,
                                            "name": "email",
                                            "storageKey": null
                                          }
                                        ],
                                        "storageKey": null
                                      }
                                    ],
                                    "storageKey": null
                                  }
                                ],
                                "storageKey": null
                              }
                            ],
                            "storageKey": null
                          },
                          {
                            "kind": "LinkedField",
                            "alias": null,
                            "args": null,
                            "concreteType": "RelationsConnection",
                            "name": "relationsByObjectId",
                            "plural": false,
                            "selections": [
                              {
                                "kind": "ScalarField",
                                "alias": null,
                                "args": null,
                                "name": "totalCount",
                                "storageKey": null
                              },
                              {
                                "kind": "LinkedField",
                                "alias": null,
                                "args": null,
                                "concreteType": "Relation",
                                "name": "nodes",
                                "plural": true,
                                "selections": [
                                  {
                                    "kind": "ScalarField",
                                    "alias": null,
                                    "args": null,
                                    "name": "id",
                                    "storageKey": null
                                  },
                                  {
                                    "kind": "ScalarField",
                                    "alias": null,
                                    "args": null,
                                    "name": "propertyCollectionId",
                                    "storageKey": null
                                  },
                                  {
                                    "kind": "ScalarField",
                                    "alias": null,
                                    "args": null,
                                    "name": "objectId",
                                    "storageKey": null
                                  },
                                  {
                                    "kind": "ScalarField",
                                    "alias": null,
                                    "args": null,
                                    "name": "objectIdRelation",
                                    "storageKey": null
                                  },
                                  {
                                    "kind": "ScalarField",
                                    "alias": null,
                                    "args": null,
                                    "name": "relationType",
                                    "storageKey": null
                                  },
                                  {
                                    "kind": "ScalarField",
                                    "alias": null,
                                    "args": null,
                                    "name": "properties",
                                    "storageKey": null
                                  },
                                  {
                                    "kind": "LinkedField",
                                    "alias": null,
                                    "args": null,
                                    "concreteType": "PropertyCollection",
                                    "name": "propertyCollectionByPropertyCollectionId",
                                    "plural": false,
                                    "selections": [
                                      {
                                        "kind": "ScalarField",
                                        "alias": null,
                                        "args": null,
                                        "name": "name",
                                        "storageKey": null
                                      },
                                      {
                                        "kind": "ScalarField",
                                        "alias": null,
                                        "args": null,
                                        "name": "description",
                                        "storageKey": null
                                      },
                                      {
                                        "kind": "ScalarField",
                                        "alias": null,
                                        "args": null,
                                        "name": "links",
                                        "storageKey": null
                                      },
                                      {
                                        "kind": "ScalarField",
                                        "alias": null,
                                        "args": null,
                                        "name": "combining",
                                        "storageKey": null
                                      },
                                      {
                                        "kind": "ScalarField",
                                        "alias": null,
                                        "args": null,
                                        "name": "lastUpdated",
                                        "storageKey": null
                                      },
                                      {
                                        "kind": "ScalarField",
                                        "alias": null,
                                        "args": null,
                                        "name": "termsOfUse",
                                        "storageKey": null
                                      },
                                      {
                                        "kind": "ScalarField",
                                        "alias": null,
                                        "args": null,
                                        "name": "importedBy",
                                        "storageKey": null
                                      },
                                      {
                                        "kind": "LinkedField",
                                        "alias": null,
                                        "args": null,
                                        "concreteType": "Organization",
                                        "name": "organizationByOrganizationId",
                                        "plural": false,
                                        "selections": [
                                          {
                                            "kind": "ScalarField",
                                            "alias": null,
                                            "args": null,
                                            "name": "name",
                                            "storageKey": null
                                          }
                                        ],
                                        "storageKey": null
                                      },
                                      {
                                        "kind": "LinkedField",
                                        "alias": null,
                                        "args": null,
                                        "concreteType": "User",
                                        "name": "userByImportedBy",
                                        "plural": false,
                                        "selections": [
                                          {
                                            "kind": "ScalarField",
                                            "alias": null,
                                            "args": null,
                                            "name": "name",
                                            "storageKey": null
                                          },
                                          {
                                            "kind": "ScalarField",
                                            "alias": null,
                                            "args": null,
                                            "name": "email",
                                            "storageKey": null
                                          }
                                        ],
                                        "storageKey": null
                                      }
                                    ],
                                    "storageKey": null
                                  },
                                  {
                                    "kind": "LinkedField",
                                    "alias": null,
                                    "args": null,
                                    "concreteType": "Object",
                                    "name": "objectByObjectIdRelation",
                                    "plural": false,
                                    "selections": [
                                      {
                                        "kind": "ScalarField",
                                        "alias": null,
                                        "args": null,
                                        "name": "name",
                                        "storageKey": null
                                      },
                                      {
                                        "kind": "ScalarField",
                                        "alias": null,
                                        "args": null,
                                        "name": "category",
                                        "storageKey": null
                                      }
                                    ],
                                    "storageKey": null
                                  }
                                ],
                                "storageKey": null
                              }
                            ],
                            "storageKey": null
                          }
                        ],
                        "storageKey": null
                      }
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": null
              },
              {
                "kind": "LinkedField",
                "alias": null,
                "args": null,
                "concreteType": "Taxonomy",
                "name": "taxonomyByTaxonomyId",
                "plural": false,
                "selections": [
                  {
                    "kind": "ScalarField",
                    "alias": null,
                    "args": null,
                    "name": "name",
                    "storageKey": null
                  },
                  {
                    "kind": "ScalarField",
                    "alias": null,
                    "args": null,
                    "name": "importedBy",
                    "storageKey": null
                  },
                  {
                    "kind": "ScalarField",
                    "alias": null,
                    "args": null,
                    "name": "description",
                    "storageKey": null
                  },
                  {
                    "kind": "ScalarField",
                    "alias": null,
                    "args": null,
                    "name": "links",
                    "storageKey": null
                  },
                  {
                    "kind": "ScalarField",
                    "alias": null,
                    "args": null,
                    "name": "lastUpdated",
                    "storageKey": null
                  },
                  {
                    "kind": "ScalarField",
                    "alias": null,
                    "args": null,
                    "name": "isCategoryStandard",
                    "storageKey": null
                  },
                  {
                    "kind": "ScalarField",
                    "alias": null,
                    "args": null,
                    "name": "id",
                    "storageKey": null
                  },
                  {
                    "kind": "ScalarField",
                    "alias": null,
                    "args": null,
                    "name": "termsOfUse",
                    "storageKey": null
                  },
                  {
                    "kind": "ScalarField",
                    "alias": null,
                    "args": null,
                    "name": "habitatLabel",
                    "storageKey": null
                  },
                  {
                    "kind": "ScalarField",
                    "alias": null,
                    "args": null,
                    "name": "habitatComments",
                    "storageKey": null
                  },
                  {
                    "kind": "ScalarField",
                    "alias": null,
                    "args": null,
                    "name": "habitatNrFnsMin",
                    "storageKey": null
                  },
                  {
                    "kind": "ScalarField",
                    "alias": null,
                    "args": null,
                    "name": "habitatNrFnsMax",
                    "storageKey": null
                  },
                  {
                    "kind": "LinkedField",
                    "alias": null,
                    "args": null,
                    "concreteType": "Organization",
                    "name": "organizationByOrganizationId",
                    "plural": false,
                    "selections": [
                      {
                        "kind": "ScalarField",
                        "alias": null,
                        "args": null,
                        "name": "id",
                        "storageKey": null
                      },
                      {
                        "kind": "ScalarField",
                        "alias": null,
                        "args": null,
                        "name": "name",
                        "storageKey": null
                      }
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": null
              },
              {
                "kind": "LinkedField",
                "alias": null,
                "args": null,
                "concreteType": "PropertyCollectionObjectsConnection",
                "name": "propertyCollectionObjectsByObjectId",
                "plural": false,
                "selections": [
                  {
                    "kind": "ScalarField",
                    "alias": null,
                    "args": null,
                    "name": "totalCount",
                    "storageKey": null
                  },
                  {
                    "kind": "LinkedField",
                    "alias": null,
                    "args": null,
                    "concreteType": "PropertyCollectionObject",
                    "name": "nodes",
                    "plural": true,
                    "selections": [
                      {
                        "kind": "ScalarField",
                        "alias": null,
                        "args": null,
                        "name": "objectId",
                        "storageKey": null
                      },
                      {
                        "kind": "ScalarField",
                        "alias": null,
                        "args": null,
                        "name": "propertyCollectionId",
                        "storageKey": null
                      },
                      {
                        "kind": "ScalarField",
                        "alias": null,
                        "args": null,
                        "name": "properties",
                        "storageKey": null
                      },
                      {
                        "kind": "LinkedField",
                        "alias": null,
                        "args": null,
                        "concreteType": "PropertyCollection",
                        "name": "propertyCollectionByPropertyCollectionId",
                        "plural": false,
                        "selections": [
                          {
                            "kind": "ScalarField",
                            "alias": null,
                            "args": null,
                            "name": "name",
                            "storageKey": null
                          },
                          {
                            "kind": "ScalarField",
                            "alias": null,
                            "args": null,
                            "name": "description",
                            "storageKey": null
                          },
                          {
                            "kind": "ScalarField",
                            "alias": null,
                            "args": null,
                            "name": "links",
                            "storageKey": null
                          },
                          {
                            "kind": "ScalarField",
                            "alias": null,
                            "args": null,
                            "name": "combining",
                            "storageKey": null
                          },
                          {
                            "kind": "ScalarField",
                            "alias": null,
                            "args": null,
                            "name": "lastUpdated",
                            "storageKey": null
                          },
                          {
                            "kind": "ScalarField",
                            "alias": null,
                            "args": null,
                            "name": "termsOfUse",
                            "storageKey": null
                          },
                          {
                            "kind": "ScalarField",
                            "alias": null,
                            "args": null,
                            "name": "importedBy",
                            "storageKey": null
                          },
                          {
                            "kind": "LinkedField",
                            "alias": null,
                            "args": null,
                            "concreteType": "Organization",
                            "name": "organizationByOrganizationId",
                            "plural": false,
                            "selections": [
                              {
                                "kind": "ScalarField",
                                "alias": null,
                                "args": null,
                                "name": "name",
                                "storageKey": null
                              }
                            ],
                            "storageKey": null
                          },
                          {
                            "kind": "LinkedField",
                            "alias": null,
                            "args": null,
                            "concreteType": "User",
                            "name": "userByImportedBy",
                            "plural": false,
                            "selections": [
                              {
                                "kind": "ScalarField",
                                "alias": null,
                                "args": null,
                                "name": "name",
                                "storageKey": null
                              },
                              {
                                "kind": "ScalarField",
                                "alias": null,
                                "args": null,
                                "name": "email",
                                "storageKey": null
                              }
                            ],
                            "storageKey": null
                          }
                        ],
                        "storageKey": null
                      }
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": null
              },
              {
                "kind": "LinkedField",
                "alias": null,
                "args": null,
                "concreteType": "RelationsConnection",
                "name": "relationsByObjectId",
                "plural": false,
                "selections": [
                  {
                    "kind": "ScalarField",
                    "alias": null,
                    "args": null,
                    "name": "totalCount",
                    "storageKey": null
                  },
                  {
                    "kind": "LinkedField",
                    "alias": null,
                    "args": null,
                    "concreteType": "Relation",
                    "name": "nodes",
                    "plural": true,
                    "selections": [
                      {
                        "kind": "ScalarField",
                        "alias": null,
                        "args": null,
                        "name": "id",
                        "storageKey": null
                      },
                      {
                        "kind": "ScalarField",
                        "alias": null,
                        "args": null,
                        "name": "propertyCollectionId",
                        "storageKey": null
                      },
                      {
                        "kind": "ScalarField",
                        "alias": null,
                        "args": null,
                        "name": "objectId",
                        "storageKey": null
                      },
                      {
                        "kind": "ScalarField",
                        "alias": null,
                        "args": null,
                        "name": "objectIdRelation",
                        "storageKey": null
                      },
                      {
                        "kind": "ScalarField",
                        "alias": null,
                        "args": null,
                        "name": "relationType",
                        "storageKey": null
                      },
                      {
                        "kind": "ScalarField",
                        "alias": null,
                        "args": null,
                        "name": "properties",
                        "storageKey": null
                      },
                      {
                        "kind": "LinkedField",
                        "alias": null,
                        "args": null,
                        "concreteType": "PropertyCollection",
                        "name": "propertyCollectionByPropertyCollectionId",
                        "plural": false,
                        "selections": [
                          {
                            "kind": "ScalarField",
                            "alias": null,
                            "args": null,
                            "name": "name",
                            "storageKey": null
                          },
                          {
                            "kind": "ScalarField",
                            "alias": null,
                            "args": null,
                            "name": "description",
                            "storageKey": null
                          },
                          {
                            "kind": "ScalarField",
                            "alias": null,
                            "args": null,
                            "name": "links",
                            "storageKey": null
                          },
                          {
                            "kind": "ScalarField",
                            "alias": null,
                            "args": null,
                            "name": "combining",
                            "storageKey": null
                          },
                          {
                            "kind": "ScalarField",
                            "alias": null,
                            "args": null,
                            "name": "lastUpdated",
                            "storageKey": null
                          },
                          {
                            "kind": "ScalarField",
                            "alias": null,
                            "args": null,
                            "name": "termsOfUse",
                            "storageKey": null
                          },
                          {
                            "kind": "ScalarField",
                            "alias": null,
                            "args": null,
                            "name": "importedBy",
                            "storageKey": null
                          },
                          {
                            "kind": "LinkedField",
                            "alias": null,
                            "args": null,
                            "concreteType": "Organization",
                            "name": "organizationByOrganizationId",
                            "plural": false,
                            "selections": [
                              {
                                "kind": "ScalarField",
                                "alias": null,
                                "args": null,
                                "name": "name",
                                "storageKey": null
                              }
                            ],
                            "storageKey": null
                          },
                          {
                            "kind": "LinkedField",
                            "alias": null,
                            "args": null,
                            "concreteType": "User",
                            "name": "userByImportedBy",
                            "plural": false,
                            "selections": [
                              {
                                "kind": "ScalarField",
                                "alias": null,
                                "args": null,
                                "name": "name",
                                "storageKey": null
                              },
                              {
                                "kind": "ScalarField",
                                "alias": null,
                                "args": null,
                                "name": "email",
                                "storageKey": null
                              }
                            ],
                            "storageKey": null
                          }
                        ],
                        "storageKey": null
                      },
                      {
                        "kind": "LinkedField",
                        "alias": null,
                        "args": null,
                        "concreteType": "Object",
                        "name": "objectByObjectIdRelation",
                        "plural": false,
                        "selections": [
                          {
                            "kind": "ScalarField",
                            "alias": null,
                            "args": null,
                            "name": "name",
                            "storageKey": null
                          },
                          {
                            "kind": "ScalarField",
                            "alias": null,
                            "args": null,
                            "name": "category",
                            "storageKey": null
                          }
                        ],
                        "storageKey": null
                      }
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": null
              }
            ],
            "storageKey": null
          }
        ]
      },
      {
        "kind": "Condition",
        "passingValue": true,
        "condition": "existsLevel5",
        "selections": [
          {
            "kind": "LinkedField",
            "alias": "level5Taxonomy",
            "args": [
              {
                "kind": "Variable",
                "name": "id",
                "variableName": "level5Taxonomy",
                "type": "Uuid!"
              }
            ],
            "concreteType": "Object",
            "name": "objectById",
            "plural": false,
            "selections": [
              {
                "kind": "LinkedField",
                "alias": null,
                "args": null,
                "concreteType": "ObjectsConnection",
                "name": "objectsByParentId",
                "plural": false,
                "selections": [
                  {
                    "kind": "LinkedField",
                    "alias": null,
                    "args": null,
                    "concreteType": "Object",
                    "name": "nodes",
                    "plural": true,
                    "selections": [
                      {
                        "kind": "ScalarField",
                        "alias": null,
                        "args": null,
                        "name": "id",
                        "storageKey": null
                      },
                      {
                        "kind": "ScalarField",
                        "alias": null,
                        "args": null,
                        "name": "name",
                        "storageKey": null
                      },
                      {
                        "kind": "LinkedField",
                        "alias": null,
                        "args": null,
                        "concreteType": "ObjectsConnection",
                        "name": "objectsByParentId",
                        "plural": false,
                        "selections": [
                          {
                            "kind": "ScalarField",
                            "alias": null,
                            "args": null,
                            "name": "totalCount",
                            "storageKey": null
                          }
                        ],
                        "storageKey": null
                      }
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": null
              }
            ],
            "storageKey": null
          }
        ]
      },
      {
        "kind": "Condition",
        "passingValue": true,
        "condition": "existsLevel3",
        "selections": [
          {
            "kind": "LinkedField",
            "alias": "level3Taxonomy",
            "args": [
              {
                "kind": "Variable",
                "name": "category",
                "variableName": "level3Taxonomy",
                "type": "String"
              }
            ],
            "concreteType": "TaxonomiesOfCategoryConnection",
            "name": "taxonomiesOfCategory",
            "plural": false,
            "selections": [
              {
                "kind": "LinkedField",
                "alias": null,
                "args": null,
                "concreteType": "Taxonomy",
                "name": "nodes",
                "plural": true,
                "selections": [
                  {
                    "kind": "ScalarField",
                    "alias": null,
                    "args": null,
                    "name": "id",
                    "storageKey": null
                  },
                  {
                    "kind": "ScalarField",
                    "alias": null,
                    "args": null,
                    "name": "name",
                    "storageKey": null
                  },
                  {
                    "kind": "LinkedField",
                    "alias": null,
                    "args": [
                      {
                        "kind": "Variable",
                        "name": "taxonomyId",
                        "variableName": "level4TaxonomyPossibleNull",
                        "type": "Uuid"
                      }
                    ],
                    "concreteType": "TaxonomyObjectLevel1Connection",
                    "name": "objectLevel1",
                    "plural": false,
                    "selections": [
                      {
                        "kind": "ScalarField",
                        "alias": null,
                        "args": null,
                        "name": "totalCount",
                        "storageKey": null
                      }
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": null
              }
            ],
            "storageKey": null
          }
        ]
      },
      {
        "kind": "Condition",
        "passingValue": true,
        "condition": "existsLevel8",
        "selections": [
          {
            "kind": "LinkedField",
            "alias": "level8Taxonomy",
            "args": [
              {
                "kind": "Variable",
                "name": "id",
                "variableName": "level8Taxonomy",
                "type": "Uuid!"
              }
            ],
            "concreteType": "Object",
            "name": "objectById",
            "plural": false,
            "selections": [
              {
                "kind": "LinkedField",
                "alias": null,
                "args": null,
                "concreteType": "ObjectsConnection",
                "name": "objectsByParentId",
                "plural": false,
                "selections": [
                  {
                    "kind": "LinkedField",
                    "alias": null,
                    "args": null,
                    "concreteType": "Object",
                    "name": "nodes",
                    "plural": true,
                    "selections": [
                      {
                        "kind": "ScalarField",
                        "alias": null,
                        "args": null,
                        "name": "id",
                        "storageKey": null
                      },
                      {
                        "kind": "ScalarField",
                        "alias": null,
                        "args": null,
                        "name": "name",
                        "storageKey": null
                      },
                      {
                        "kind": "LinkedField",
                        "alias": null,
                        "args": null,
                        "concreteType": "ObjectsConnection",
                        "name": "objectsByParentId",
                        "plural": false,
                        "selections": [
                          {
                            "kind": "ScalarField",
                            "alias": null,
                            "args": null,
                            "name": "totalCount",
                            "storageKey": null
                          }
                        ],
                        "storageKey": null
                      }
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": null
              }
            ],
            "storageKey": null
          }
        ]
      },
      {
        "kind": "Condition",
        "passingValue": true,
        "condition": "existsLevel2Pc",
        "selections": [
          {
            "kind": "LinkedField",
            "alias": null,
            "args": null,
            "concreteType": "PropertyCollectionsConnection",
            "name": "allPropertyCollections",
            "plural": false,
            "selections": [
              {
                "kind": "LinkedField",
                "alias": null,
                "args": null,
                "concreteType": "PropertyCollection",
                "name": "nodes",
                "plural": true,
                "selections": [
                  {
                    "kind": "ScalarField",
                    "alias": null,
                    "args": null,
                    "name": "id",
                    "storageKey": null
                  },
                  {
                    "kind": "ScalarField",
                    "alias": null,
                    "args": null,
                    "name": "name",
                    "storageKey": null
                  },
                  {
                    "kind": "LinkedField",
                    "alias": null,
                    "args": null,
                    "concreteType": "PropertyCollectionObjectsConnection",
                    "name": "propertyCollectionObjectsByPropertyCollectionId",
                    "plural": false,
                    "selections": [
                      {
                        "kind": "ScalarField",
                        "alias": null,
                        "args": null,
                        "name": "totalCount",
                        "storageKey": null
                      }
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": null
              }
            ],
            "storageKey": null
          }
        ]
      },
      {
        "kind": "Condition",
        "passingValue": true,
        "condition": "existsLevel6",
        "selections": [
          {
            "kind": "LinkedField",
            "alias": "level6Taxonomy",
            "args": [
              {
                "kind": "Variable",
                "name": "id",
                "variableName": "level6Taxonomy",
                "type": "Uuid!"
              }
            ],
            "concreteType": "Object",
            "name": "objectById",
            "plural": false,
            "selections": [
              {
                "kind": "LinkedField",
                "alias": null,
                "args": null,
                "concreteType": "ObjectsConnection",
                "name": "objectsByParentId",
                "plural": false,
                "selections": [
                  {
                    "kind": "LinkedField",
                    "alias": null,
                    "args": null,
                    "concreteType": "Object",
                    "name": "nodes",
                    "plural": true,
                    "selections": [
                      {
                        "kind": "ScalarField",
                        "alias": null,
                        "args": null,
                        "name": "id",
                        "storageKey": null
                      },
                      {
                        "kind": "ScalarField",
                        "alias": null,
                        "args": null,
                        "name": "name",
                        "storageKey": null
                      },
                      {
                        "kind": "LinkedField",
                        "alias": null,
                        "args": null,
                        "concreteType": "ObjectsConnection",
                        "name": "objectsByParentId",
                        "plural": false,
                        "selections": [
                          {
                            "kind": "ScalarField",
                            "alias": null,
                            "args": null,
                            "name": "totalCount",
                            "storageKey": null
                          }
                        ],
                        "storageKey": null
                      }
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": null
              }
            ],
            "storageKey": null
          }
        ]
      }
    ]
  },
  "text": "query AppQueryQuery(\n  $existsLevel2Pc: Boolean!\n  $existsLevel2Taxonomy: Boolean!\n  $existsLevel3: Boolean!\n  $level3Taxonomy: String!\n  $existsLevel4: Boolean!\n  $level4Taxonomy: Uuid!\n  $level4TaxonomyPossibleNull: Uuid\n  $existsLevel5: Boolean!\n  $level5Taxonomy: Uuid!\n  $existsLevel6: Boolean!\n  $level6Taxonomy: Uuid!\n  $existsLevel7: Boolean!\n  $level7Taxonomy: Uuid!\n  $existsLevel8: Boolean!\n  $level8Taxonomy: Uuid!\n  $existsLevel9: Boolean!\n  $level9Taxonomy: Uuid!\n  $existsLevel10: Boolean!\n  $level10Taxonomy: Uuid!\n  $activeObjectId: Uuid!\n  $existsActiveObject: Boolean!\n  $existsUrlFromTOId: Boolean!\n  $urlFromTOId: Uuid!\n  $existsTreeFilterText: Boolean!\n  $treeFilterText: String!\n  $queryGroups: Boolean!\n  $queryExportCategories: Boolean!\n  $exportCategories: [String]\n) {\n  allCategories {\n    totalCount\n  }\n  allPropertyCollections {\n    totalCount\n  }\n  allPropertyCollections @include(if: $existsLevel2Pc) {\n    nodes {\n      id\n      name\n      propertyCollectionObjectsByPropertyCollectionId {\n        totalCount\n      }\n    }\n  }\n  level2Taxonomy: categoriesOfTaxonomiesFunction @include(if: $existsLevel2Taxonomy) {\n    nodes {\n      name\n      id\n      count\n    }\n  }\n  level3Taxonomy: taxonomiesOfCategory(category: $level3Taxonomy) @include(if: $existsLevel3) {\n    nodes {\n      id\n      name\n      objectLevel1(taxonomyId: $level4TaxonomyPossibleNull) {\n        totalCount\n      }\n    }\n  }\n  level4Taxonomy: taxonomyById(id: $level4Taxonomy) @include(if: $existsLevel4) {\n    objectLevel1(taxonomyId: $level4TaxonomyPossibleNull) {\n      nodes {\n        id\n        name\n        objectsByParentId {\n          totalCount\n        }\n      }\n    }\n  }\n  level5Taxonomy: objectById(id: $level5Taxonomy) @include(if: $existsLevel5) {\n    objectsByParentId {\n      nodes {\n        id\n        name\n        objectsByParentId {\n          totalCount\n        }\n      }\n    }\n  }\n  level6Taxonomy: objectById(id: $level6Taxonomy) @include(if: $existsLevel6) {\n    objectsByParentId {\n      nodes {\n        id\n        name\n        objectsByParentId {\n          totalCount\n        }\n      }\n    }\n  }\n  level7Taxonomy: objectById(id: $level7Taxonomy) @include(if: $existsLevel7) {\n    objectsByParentId {\n      nodes {\n        id\n        name\n        objectsByParentId {\n          totalCount\n        }\n      }\n    }\n  }\n  level8Taxonomy: objectById(id: $level8Taxonomy) @include(if: $existsLevel8) {\n    objectsByParentId {\n      nodes {\n        id\n        name\n        objectsByParentId {\n          totalCount\n        }\n      }\n    }\n  }\n  level9Taxonomy: objectById(id: $level9Taxonomy) @include(if: $existsLevel9) {\n    objectsByParentId {\n      nodes {\n        id\n        name\n        objectsByParentId {\n          totalCount\n        }\n      }\n    }\n  }\n  level10Taxonomy: objectById(id: $level10Taxonomy) @include(if: $existsLevel10) {\n    objectsByParentId {\n      nodes {\n        id\n        name\n        objectsByParentId {\n          totalCount\n        }\n      }\n    }\n  }\n  activeObject: objectById(id: $activeObjectId) @include(if: $existsActiveObject) {\n    ...Objekt_activeObject\n  }\n  urlFromTO: objectById(id: $urlFromTOId) @include(if: $existsUrlFromTOId) {\n    id\n    categoryByCategory {\n      name\n      dataType\n    }\n    objectByParentId {\n      id\n      objectByParentId {\n        id\n        objectByParentId {\n          id\n          objectByParentId {\n            id\n            objectByParentId {\n              id\n              objectByParentId {\n                id\n              }\n            }\n          }\n        }\n      }\n    }\n    taxonomyByTaxonomyId {\n      id\n    }\n  }\n  filterSuggestionsPC: propertyCollectionByPropertyName(propertyName: $treeFilterText) @include(if: $existsTreeFilterText) {\n    totalCount\n    nodes {\n      id\n      name\n    }\n  }\n  filterSuggestionsTO: objectByObjectName(objectName: $treeFilterText) @include(if: $existsTreeFilterText) {\n    totalCount\n    nodes {\n      id\n      name\n    }\n  }\n  allCategories @include(if: $queryGroups) {\n    nodes {\n      name\n    }\n  }\n  pcoPropertiesByCategoriesFunction(categories: $exportCategories) @include(if: $queryExportCategories) {\n    nodes {\n      propertyCollectionName\n      propertyName\n      jsontype\n      count\n    }\n  }\n}\n\nfragment Objekt_activeObject on Object {\n  id\n  taxonomyId\n  parentId\n  name\n  properties\n  category\n  idOld\n  synonymsByObjectId {\n    totalCount\n    nodes {\n      objectByObjectIdSynonym {\n        id\n        taxonomyId\n        parentId\n        name\n        properties\n        category\n        idOld\n        taxonomyByTaxonomyId {\n          importedBy\n          id\n          description\n          links\n          lastUpdated\n          isCategoryStandard\n          name\n          termsOfUse\n          habitatLabel\n          habitatComments\n          habitatNrFnsMin\n          habitatNrFnsMax\n          organizationByOrganizationId {\n            id\n            name\n          }\n        }\n        propertyCollectionObjectsByObjectId {\n          totalCount\n          nodes {\n            objectId\n            propertyCollectionId\n            properties\n            propertyCollectionByPropertyCollectionId {\n              name\n              description\n              links\n              combining\n              lastUpdated\n              termsOfUse\n              importedBy\n              organizationByOrganizationId {\n                name\n              }\n              userByImportedBy {\n                name\n                email\n              }\n            }\n          }\n        }\n        relationsByObjectId {\n          totalCount\n          nodes {\n            id\n            propertyCollectionId\n            objectId\n            objectIdRelation\n            relationType\n            properties\n            propertyCollectionByPropertyCollectionId {\n              name\n              description\n              links\n              combining\n              lastUpdated\n              termsOfUse\n              importedBy\n              organizationByOrganizationId {\n                name\n              }\n              userByImportedBy {\n                name\n                email\n              }\n            }\n            objectByObjectIdRelation {\n              name\n              category\n            }\n          }\n        }\n      }\n    }\n  }\n  taxonomyByTaxonomyId {\n    importedBy\n    id\n    description\n    links\n    lastUpdated\n    isCategoryStandard\n    name\n    termsOfUse\n    habitatLabel\n    habitatComments\n    habitatNrFnsMin\n    habitatNrFnsMax\n    organizationByOrganizationId {\n      id\n      name\n    }\n  }\n  propertyCollectionObjectsByObjectId {\n    totalCount\n    nodes {\n      objectId\n      propertyCollectionId\n      properties\n      propertyCollectionByPropertyCollectionId {\n        name\n        description\n        links\n        combining\n        lastUpdated\n        termsOfUse\n        importedBy\n        organizationByOrganizationId {\n          name\n        }\n        userByImportedBy {\n          name\n          email\n        }\n      }\n    }\n  }\n  relationsByObjectId {\n    totalCount\n    nodes {\n      id\n      propertyCollectionId\n      objectId\n      objectIdRelation\n      relationType\n      properties\n      propertyCollectionByPropertyCollectionId {\n        name\n        description\n        links\n        combining\n        lastUpdated\n        termsOfUse\n        importedBy\n        organizationByOrganizationId {\n          name\n        }\n        userByImportedBy {\n          name\n          email\n        }\n      }\n      objectByObjectIdRelation {\n        name\n        category\n      }\n    }\n  }\n}\n"
};

module.exports = batch;
