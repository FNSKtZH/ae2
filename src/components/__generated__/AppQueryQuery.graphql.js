/**
 * @flow
 * @relayHash 2527796e507118889940eb0105d3eeb2
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
    +totalCount: ?number;
  |};
  +propertyCollectionByDataType?: ?{|
    +nodes: ?$ReadOnlyArray<?{|
      +id: any;
      +name: string;
      +propertyCollectionObjectsByPropertyCollectionId: ?{|
        +totalCount: ?number;
      |};
    |}>;
  |};
  +level2Taxonomy?: ?{|
    +nodes: ?$ReadOnlyArray<?{|
      +id: ?any;
      +name: string;
      +taxonomyByCategory: ?{|
        +totalCount: ?number;
      |};
    |}>;
  |};
  +level3Taxonomy?: ?{|
    +taxonomiesByCategory: ?{|
      +nodes: ?$ReadOnlyArray<{|
        +id: any;
        +name: string;
        +taxonomyObjectLevel1: ?{|
          +totalCount: ?number;
        |};
      |}>;
    |};
  |};
  +level4Taxonomy?: ?{|
    +taxonomyObjectLevel1: ?{|
      +nodes: ?$ReadOnlyArray<?{|
        +id: any;
        +name: string;
        +taxonomyObjectsByParentId: ?{|
          +totalCount: ?number;
        |};
      |}>;
    |};
  |};
  +level5Taxonomy?: ?{|
    +taxonomyObjectsByParentId: ?{|
      +totalCount: ?number;
      +nodes: ?$ReadOnlyArray<{|
        +id: any;
        +name: string;
        +taxonomyObjectsByParentId: ?{|
          +totalCount: ?number;
        |};
      |}>;
    |};
  |};
  +level6Taxonomy?: ?{|
    +taxonomyObjectsByParentId: ?{|
      +totalCount: ?number;
      +nodes: ?$ReadOnlyArray<{|
        +id: any;
        +name: string;
        +taxonomyObjectsByParentId: ?{|
          +totalCount: ?number;
        |};
      |}>;
    |};
  |};
  +level7Taxonomy?: ?{|
    +taxonomyObjectsByParentId: ?{|
      +totalCount: ?number;
      +nodes: ?$ReadOnlyArray<{|
        +id: any;
        +name: string;
        +taxonomyObjectsByParentId: ?{|
          +totalCount: ?number;
        |};
      |}>;
    |};
  |};
  +level8Taxonomy?: ?{|
    +taxonomyObjectsByParentId: ?{|
      +totalCount: ?number;
      +nodes: ?$ReadOnlyArray<{|
        +id: any;
        +name: string;
        +taxonomyObjectsByParentId: ?{|
          +totalCount: ?number;
        |};
      |}>;
    |};
  |};
  +level9Taxonomy?: ?{|
    +taxonomyObjectsByParentId: ?{|
      +totalCount: ?number;
      +nodes: ?$ReadOnlyArray<{|
        +id: any;
        +name: string;
        +taxonomyObjectsByParentId: ?{|
          +totalCount: ?number;
        |};
      |}>;
    |};
  |};
  +level10Taxonomy?: ?{|
    +taxonomyObjectsByParentId: ?{|
      +totalCount: ?number;
      +nodes: ?$ReadOnlyArray<{|
        +id: any;
        +name: string;
        +taxonomyObjectsByParentId: ?{|
          +totalCount: ?number;
        |};
      |}>;
    |};
  |};
  +taxonomyObjectById?: ?{|
    +objectByObjectId: ?{|
      +id: any;
      +taxonomyObjectsByObjectId: ?{|
        +totalCount: ?number;
        +nodes: ?$ReadOnlyArray<{|
          +taxonomyByTaxonomyId: ?{|
            +id: any;
            +name: string;
            +description: ?string;
            +links: ?$ReadOnlyArray<?string>;
            +lastUpdated: ?any;
            +organizationByOrganizationId: ?{|
              +name: string;
            |};
          |};
          +id: any;
          +name: string;
          +properties: ?any;
          +synonymsByTaxonomyObjectId: ?{|
            +totalCount: ?number;
            +nodes: ?$ReadOnlyArray<{|
              +taxonomyObjectIdSynonym: any;
              +taxonomyObjectByTaxonomyObjectIdSynonym: ?{|
                +id: any;
                +name: string;
                +properties: ?any;
                +taxonomyByTaxonomyId: ?{|
                  +name: string;
                  +description: ?string;
                  +links: ?$ReadOnlyArray<?string>;
                  +lastUpdated: ?any;
                  +organizationByOrganizationId: ?{|
                    +name: string;
                  |};
                |};
                +objectByObjectId: ?{|
                  +id: any;
                  +propertyCollectionObjectsByObjectId: ?{|
                    +totalCount: ?number;
                    +nodes: ?$ReadOnlyArray<{|
                      +objectId: ?any;
                      +propertyCollectionId: ?any;
                      +properties: ?any;
                      +propertyCollectionByPropertyCollectionId: ?{|
                        +name: string;
                        +description: ?string;
                        +links: ?$ReadOnlyArray<?string>;
                        +combining: ?boolean;
                        +lastUpdated: ?any;
                        +termsOfUse: ?string;
                        +importedBy: any;
                        +organizationByOrganizationId: ?{|
                          +name: string;
                        |};
                        +userByImportedBy: ?{|
                          +name: string;
                          +email: string;
                        |};
                      |};
                    |}>;
                  |};
                |};
              |};
            |}>;
          |};
        |}>;
      |};
      +propertyCollectionObjectsByObjectId: ?{|
        +totalCount: ?number;
        +nodes: ?$ReadOnlyArray<{|
          +objectId: ?any;
          +propertyCollectionId: ?any;
          +properties: ?any;
          +propertyCollectionByPropertyCollectionId: ?{|
            +name: string;
            +description: ?string;
            +links: ?$ReadOnlyArray<?string>;
            +combining: ?boolean;
            +lastUpdated: ?any;
            +termsOfUse: ?string;
            +importedBy: any;
            +organizationByOrganizationId: ?{|
              +name: string;
            |};
            +userByImportedBy: ?{|
              +name: string;
              +email: string;
            |};
          |};
        |}>;
      |};
    |};
  |};
  +urlFromTO?: ?{|
    +id: any;
    +taxonomyObjectByParentId: ?{|
      +id: any;
      +taxonomyObjectByParentId: ?{|
        +id: any;
        +taxonomyObjectByParentId: ?{|
          +id: any;
          +taxonomyObjectByParentId: ?{|
            +id: any;
            +taxonomyObjectByParentId: ?{|
              +id: any;
              +taxonomyObjectByParentId: ?{|
                +id: any;
              |};
            |};
          |};
        |};
      |};
    |};
    +taxonomyByTaxonomyId: ?{|
      +id: any;
      +categoryByCategory: ?{|
        +name: string;
        +dataType: ?string;
      |};
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
  propertyCollectionByDataType(datatype: $level2Pc) @include(if: $existsLevel2Pc) {
    nodes {
      id
      name
      propertyCollectionObjectsByPropertyCollectionId {
        totalCount
      }
    }
  }
  level2Taxonomy: categoryByDataType(datatype: $level2Taxonomy) @include(if: $existsLevel2Taxonomy) {
    nodes {
      id
      name
      taxonomyByCategory {
        totalCount
      }
    }
  }
  level3Taxonomy: categoryByName(name: $level3Taxonomy) @include(if: $existsLevel3) {
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
  level4Taxonomy: taxonomyById(id: $level4Taxonomy) @include(if: $existsLevel4) {
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
  level5Taxonomy: taxonomyObjectById(id: $level5Taxonomy) @include(if: $existsLevel5) {
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
  level6Taxonomy: taxonomyObjectById(id: $level6Taxonomy) @include(if: $existsLevel6) {
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
  level7Taxonomy: taxonomyObjectById(id: $level7Taxonomy) @include(if: $existsLevel7) {
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
  level8Taxonomy: taxonomyObjectById(id: $level8Taxonomy) @include(if: $existsLevel8) {
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
  level9Taxonomy: taxonomyObjectById(id: $level9Taxonomy) @include(if: $existsLevel9) {
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
  level10Taxonomy: taxonomyObjectById(id: $level10Taxonomy) @include(if: $existsLevel10) {
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
  taxonomyObjectById(id: $activeTaxonomyObjectId) @include(if: $existsActiveTaxonomyObject) {
    objectByObjectId {
      id
      taxonomyObjectsByObjectId {
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
              taxonomyObjectIdSynonym
              taxonomyObjectByTaxonomyObjectIdSynonym {
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
        }
      }
    }
  }
  urlFromTO: taxonomyObjectById(id: $urlFromTOId) @include(if: $existsUrlFromTOId) {
    id
    taxonomyObjectByParentId {
      id
      taxonomyObjectByParentId {
        id
        taxonomyObjectByParentId {
          id
          taxonomyObjectByParentId {
            id
            taxonomyObjectByParentId {
              id
              taxonomyObjectByParentId {
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
  filterSuggestionsPC: propertyCollectionByPropertyName(propertyName: $treeFilterText) @include(if: $existsTreeFilterText) {
    totalCount
    nodes {
      id
      name
    }
  }
  filterSuggestionsTO: taxonomyObjectByTaxonomyObjectName(taxonomyObjectName: $treeFilterText) @include(if: $existsTreeFilterText) {
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
        "name": "level2Pc",
        "type": "String!",
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
        "name": "level2Taxonomy",
        "type": "String!",
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
        "name": "activeTaxonomyObjectId",
        "type": "Uuid!",
        "defaultValue": null
      },
      {
        "kind": "LocalArgument",
        "name": "existsActiveTaxonomyObject",
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
            "concreteType": "TaxonomyObject",
            "name": "taxonomyObjectById",
            "plural": false,
            "selections": [
              {
                "kind": "LinkedField",
                "alias": null,
                "args": null,
                "concreteType": "TaxonomyObjectsConnection",
                "name": "taxonomyObjectsByParentId",
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
                    "concreteType": "TaxonomyObject",
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
                        "concreteType": "TaxonomyObjectsConnection",
                        "name": "taxonomyObjectsByParentId",
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
            "concreteType": "TaxonomyObject",
            "name": "taxonomyObjectById",
            "plural": false,
            "selections": [
              {
                "kind": "LinkedField",
                "alias": null,
                "args": null,
                "concreteType": "TaxonomyObjectsConnection",
                "name": "taxonomyObjectsByParentId",
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
                    "concreteType": "TaxonomyObject",
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
                        "concreteType": "TaxonomyObjectsConnection",
                        "name": "taxonomyObjectsByParentId",
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
            "concreteType": "TaxonomyObject",
            "name": "taxonomyObjectById",
            "plural": false,
            "selections": [
              {
                "kind": "LinkedField",
                "alias": null,
                "args": null,
                "concreteType": "TaxonomyObjectsConnection",
                "name": "taxonomyObjectsByParentId",
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
                    "concreteType": "TaxonomyObject",
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
                        "concreteType": "TaxonomyObjectsConnection",
                        "name": "taxonomyObjectsByParentId",
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
            "args": [
              {
                "kind": "Variable",
                "name": "datatype",
                "variableName": "level2Taxonomy",
                "type": "String"
              }
            ],
            "concreteType": "CategoryByDataTypeConnection",
            "name": "categoryByDataType",
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
                    "concreteType": "CategoryTaxonomyByCategoryConnection",
                    "name": "taxonomyByCategory",
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
                "args": null,
                "concreteType": "TaxonomyTaxonomyObjectLevel1Connection",
                "name": "taxonomyObjectLevel1",
                "plural": false,
                "selections": [
                  {
                    "kind": "LinkedField",
                    "alias": null,
                    "args": null,
                    "concreteType": "TaxonomyObject",
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
                        "concreteType": "TaxonomyObjectsConnection",
                        "name": "taxonomyObjectsByParentId",
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
                "name": "taxonomyObjectName",
                "variableName": "treeFilterText",
                "type": "String"
              }
            ],
            "concreteType": "TaxonomyObjectByTaxonomyObjectNameConnection",
            "name": "taxonomyObjectByTaxonomyObjectName",
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
                "concreteType": "TaxonomyObject",
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
            "concreteType": "TaxonomyObject",
            "name": "taxonomyObjectById",
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
                "concreteType": "TaxonomyObject",
                "name": "taxonomyObjectByParentId",
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
                    "concreteType": "TaxonomyObject",
                    "name": "taxonomyObjectByParentId",
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
                        "concreteType": "TaxonomyObject",
                        "name": "taxonomyObjectByParentId",
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
                            "concreteType": "TaxonomyObject",
                            "name": "taxonomyObjectByParentId",
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
                                "concreteType": "TaxonomyObject",
                                "name": "taxonomyObjectByParentId",
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
                                    "concreteType": "TaxonomyObject",
                                    "name": "taxonomyObjectByParentId",
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
        "condition": "existsActiveTaxonomyObject",
        "selections": [
          {
            "kind": "LinkedField",
            "alias": null,
            "args": [
              {
                "kind": "Variable",
                "name": "id",
                "variableName": "activeTaxonomyObjectId",
                "type": "Uuid!"
              }
            ],
            "concreteType": "TaxonomyObject",
            "name": "taxonomyObjectById",
            "plural": false,
            "selections": [
              {
                "kind": "LinkedField",
                "alias": null,
                "args": null,
                "concreteType": "Object",
                "name": "objectByObjectId",
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
                    "concreteType": "TaxonomyObjectsConnection",
                    "name": "taxonomyObjectsByObjectId",
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
                        "concreteType": "TaxonomyObject",
                        "name": "nodes",
                        "plural": true,
                        "selections": [
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
                              }
                            ],
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
                            "kind": "LinkedField",
                            "alias": null,
                            "args": null,
                            "concreteType": "SynonymsConnection",
                            "name": "synonymsByTaxonomyObjectId",
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
                                    "kind": "ScalarField",
                                    "alias": null,
                                    "args": null,
                                    "name": "taxonomyObjectIdSynonym",
                                    "storageKey": null
                                  },
                                  {
                                    "kind": "LinkedField",
                                    "alias": null,
                                    "args": null,
                                    "concreteType": "TaxonomyObject",
                                    "name": "taxonomyObjectByTaxonomyObjectIdSynonym",
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
                                          }
                                        ],
                                        "storageKey": null
                                      },
                                      {
                                        "kind": "LinkedField",
                                        "alias": null,
                                        "args": null,
                                        "concreteType": "Object",
                                        "name": "objectByObjectId",
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
            "concreteType": "TaxonomyObject",
            "name": "taxonomyObjectById",
            "plural": false,
            "selections": [
              {
                "kind": "LinkedField",
                "alias": null,
                "args": null,
                "concreteType": "TaxonomyObjectsConnection",
                "name": "taxonomyObjectsByParentId",
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
                    "concreteType": "TaxonomyObject",
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
                        "concreteType": "TaxonomyObjectsConnection",
                        "name": "taxonomyObjectsByParentId",
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
                "name": "name",
                "variableName": "level3Taxonomy",
                "type": "String!"
              }
            ],
            "concreteType": "Category",
            "name": "categoryByName",
            "plural": false,
            "selections": [
              {
                "kind": "LinkedField",
                "alias": null,
                "args": null,
                "concreteType": "TaxonomiesConnection",
                "name": "taxonomiesByCategory",
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
                        "args": null,
                        "concreteType": "TaxonomyTaxonomyObjectLevel1Connection",
                        "name": "taxonomyObjectLevel1",
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
            "concreteType": "TaxonomyObject",
            "name": "taxonomyObjectById",
            "plural": false,
            "selections": [
              {
                "kind": "LinkedField",
                "alias": null,
                "args": null,
                "concreteType": "TaxonomyObjectsConnection",
                "name": "taxonomyObjectsByParentId",
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
                    "concreteType": "TaxonomyObject",
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
                        "concreteType": "TaxonomyObjectsConnection",
                        "name": "taxonomyObjectsByParentId",
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
            "args": [
              {
                "kind": "Variable",
                "name": "datatype",
                "variableName": "level2Pc",
                "type": "String"
              }
            ],
            "concreteType": "PropertyCollectionByDataTypeConnection",
            "name": "propertyCollectionByDataType",
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
            "concreteType": "TaxonomyObject",
            "name": "taxonomyObjectById",
            "plural": false,
            "selections": [
              {
                "kind": "LinkedField",
                "alias": null,
                "args": null,
                "concreteType": "TaxonomyObjectsConnection",
                "name": "taxonomyObjectsByParentId",
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
                    "concreteType": "TaxonomyObject",
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
                        "concreteType": "TaxonomyObjectsConnection",
                        "name": "taxonomyObjectsByParentId",
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
        "name": "level2Pc",
        "type": "String!",
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
        "name": "level2Taxonomy",
        "type": "String!",
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
        "name": "activeTaxonomyObjectId",
        "type": "Uuid!",
        "defaultValue": null
      },
      {
        "kind": "LocalArgument",
        "name": "existsActiveTaxonomyObject",
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
            "concreteType": "TaxonomyObject",
            "name": "taxonomyObjectById",
            "plural": false,
            "selections": [
              {
                "kind": "LinkedField",
                "alias": null,
                "args": null,
                "concreteType": "TaxonomyObjectsConnection",
                "name": "taxonomyObjectsByParentId",
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
                    "concreteType": "TaxonomyObject",
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
                        "concreteType": "TaxonomyObjectsConnection",
                        "name": "taxonomyObjectsByParentId",
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
            "concreteType": "TaxonomyObject",
            "name": "taxonomyObjectById",
            "plural": false,
            "selections": [
              {
                "kind": "LinkedField",
                "alias": null,
                "args": null,
                "concreteType": "TaxonomyObjectsConnection",
                "name": "taxonomyObjectsByParentId",
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
                    "concreteType": "TaxonomyObject",
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
                        "concreteType": "TaxonomyObjectsConnection",
                        "name": "taxonomyObjectsByParentId",
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
            "concreteType": "TaxonomyObject",
            "name": "taxonomyObjectById",
            "plural": false,
            "selections": [
              {
                "kind": "LinkedField",
                "alias": null,
                "args": null,
                "concreteType": "TaxonomyObjectsConnection",
                "name": "taxonomyObjectsByParentId",
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
                    "concreteType": "TaxonomyObject",
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
                        "concreteType": "TaxonomyObjectsConnection",
                        "name": "taxonomyObjectsByParentId",
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
            "args": [
              {
                "kind": "Variable",
                "name": "datatype",
                "variableName": "level2Taxonomy",
                "type": "String"
              }
            ],
            "concreteType": "CategoryByDataTypeConnection",
            "name": "categoryByDataType",
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
                    "concreteType": "CategoryTaxonomyByCategoryConnection",
                    "name": "taxonomyByCategory",
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
                "args": null,
                "concreteType": "TaxonomyTaxonomyObjectLevel1Connection",
                "name": "taxonomyObjectLevel1",
                "plural": false,
                "selections": [
                  {
                    "kind": "LinkedField",
                    "alias": null,
                    "args": null,
                    "concreteType": "TaxonomyObject",
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
                        "concreteType": "TaxonomyObjectsConnection",
                        "name": "taxonomyObjectsByParentId",
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
                "name": "taxonomyObjectName",
                "variableName": "treeFilterText",
                "type": "String"
              }
            ],
            "concreteType": "TaxonomyObjectByTaxonomyObjectNameConnection",
            "name": "taxonomyObjectByTaxonomyObjectName",
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
                "concreteType": "TaxonomyObject",
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
            "concreteType": "TaxonomyObject",
            "name": "taxonomyObjectById",
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
                "concreteType": "TaxonomyObject",
                "name": "taxonomyObjectByParentId",
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
                    "concreteType": "TaxonomyObject",
                    "name": "taxonomyObjectByParentId",
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
                        "concreteType": "TaxonomyObject",
                        "name": "taxonomyObjectByParentId",
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
                            "concreteType": "TaxonomyObject",
                            "name": "taxonomyObjectByParentId",
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
                                "concreteType": "TaxonomyObject",
                                "name": "taxonomyObjectByParentId",
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
                                    "concreteType": "TaxonomyObject",
                                    "name": "taxonomyObjectByParentId",
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
        "condition": "existsActiveTaxonomyObject",
        "selections": [
          {
            "kind": "LinkedField",
            "alias": null,
            "args": [
              {
                "kind": "Variable",
                "name": "id",
                "variableName": "activeTaxonomyObjectId",
                "type": "Uuid!"
              }
            ],
            "concreteType": "TaxonomyObject",
            "name": "taxonomyObjectById",
            "plural": false,
            "selections": [
              {
                "kind": "LinkedField",
                "alias": null,
                "args": null,
                "concreteType": "Object",
                "name": "objectByObjectId",
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
                    "concreteType": "TaxonomyObjectsConnection",
                    "name": "taxonomyObjectsByObjectId",
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
                        "concreteType": "TaxonomyObject",
                        "name": "nodes",
                        "plural": true,
                        "selections": [
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
                              }
                            ],
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
                            "kind": "LinkedField",
                            "alias": null,
                            "args": null,
                            "concreteType": "SynonymsConnection",
                            "name": "synonymsByTaxonomyObjectId",
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
                                    "kind": "ScalarField",
                                    "alias": null,
                                    "args": null,
                                    "name": "taxonomyObjectIdSynonym",
                                    "storageKey": null
                                  },
                                  {
                                    "kind": "LinkedField",
                                    "alias": null,
                                    "args": null,
                                    "concreteType": "TaxonomyObject",
                                    "name": "taxonomyObjectByTaxonomyObjectIdSynonym",
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
                                          }
                                        ],
                                        "storageKey": null
                                      },
                                      {
                                        "kind": "LinkedField",
                                        "alias": null,
                                        "args": null,
                                        "concreteType": "Object",
                                        "name": "objectByObjectId",
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
            "concreteType": "TaxonomyObject",
            "name": "taxonomyObjectById",
            "plural": false,
            "selections": [
              {
                "kind": "LinkedField",
                "alias": null,
                "args": null,
                "concreteType": "TaxonomyObjectsConnection",
                "name": "taxonomyObjectsByParentId",
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
                    "concreteType": "TaxonomyObject",
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
                        "concreteType": "TaxonomyObjectsConnection",
                        "name": "taxonomyObjectsByParentId",
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
                "name": "name",
                "variableName": "level3Taxonomy",
                "type": "String!"
              }
            ],
            "concreteType": "Category",
            "name": "categoryByName",
            "plural": false,
            "selections": [
              {
                "kind": "LinkedField",
                "alias": null,
                "args": null,
                "concreteType": "TaxonomiesConnection",
                "name": "taxonomiesByCategory",
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
                        "args": null,
                        "concreteType": "TaxonomyTaxonomyObjectLevel1Connection",
                        "name": "taxonomyObjectLevel1",
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
            "concreteType": "TaxonomyObject",
            "name": "taxonomyObjectById",
            "plural": false,
            "selections": [
              {
                "kind": "LinkedField",
                "alias": null,
                "args": null,
                "concreteType": "TaxonomyObjectsConnection",
                "name": "taxonomyObjectsByParentId",
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
                    "concreteType": "TaxonomyObject",
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
                        "concreteType": "TaxonomyObjectsConnection",
                        "name": "taxonomyObjectsByParentId",
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
            "args": [
              {
                "kind": "Variable",
                "name": "datatype",
                "variableName": "level2Pc",
                "type": "String"
              }
            ],
            "concreteType": "PropertyCollectionByDataTypeConnection",
            "name": "propertyCollectionByDataType",
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
            "concreteType": "TaxonomyObject",
            "name": "taxonomyObjectById",
            "plural": false,
            "selections": [
              {
                "kind": "LinkedField",
                "alias": null,
                "args": null,
                "concreteType": "TaxonomyObjectsConnection",
                "name": "taxonomyObjectsByParentId",
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
                    "concreteType": "TaxonomyObject",
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
                        "concreteType": "TaxonomyObjectsConnection",
                        "name": "taxonomyObjectsByParentId",
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
  "text": "query AppQueryQuery(\n  $existsLevel2Pc: Boolean!\n  $level2Pc: String!\n  $existsLevel2Taxonomy: Boolean!\n  $level2Taxonomy: String!\n  $existsLevel3: Boolean!\n  $level3Taxonomy: String!\n  $existsLevel4: Boolean!\n  $level4Taxonomy: Uuid!\n  $existsLevel5: Boolean!\n  $level5Taxonomy: Uuid!\n  $existsLevel6: Boolean!\n  $level6Taxonomy: Uuid!\n  $existsLevel7: Boolean!\n  $level7Taxonomy: Uuid!\n  $existsLevel8: Boolean!\n  $level8Taxonomy: Uuid!\n  $existsLevel9: Boolean!\n  $level9Taxonomy: Uuid!\n  $existsLevel10: Boolean!\n  $level10Taxonomy: Uuid!\n  $activeTaxonomyObjectId: Uuid!\n  $existsActiveTaxonomyObject: Boolean!\n  $existsUrlFromTOId: Boolean!\n  $urlFromTOId: Uuid!\n  $existsTreeFilterText: Boolean!\n  $treeFilterText: String!\n  $queryGroups: Boolean!\n  $queryExportCategories: Boolean!\n  $exportCategories: [String]\n) {\n  allCategories {\n    totalCount\n  }\n  allPropertyCollections {\n    totalCount\n  }\n  propertyCollectionByDataType(datatype: $level2Pc) @include(if: $existsLevel2Pc) {\n    nodes {\n      id\n      name\n      propertyCollectionObjectsByPropertyCollectionId {\n        totalCount\n      }\n    }\n  }\n  level2Taxonomy: categoryByDataType(datatype: $level2Taxonomy) @include(if: $existsLevel2Taxonomy) {\n    nodes {\n      id\n      name\n      taxonomyByCategory {\n        totalCount\n      }\n    }\n  }\n  level3Taxonomy: categoryByName(name: $level3Taxonomy) @include(if: $existsLevel3) {\n    taxonomiesByCategory {\n      nodes {\n        id\n        name\n        taxonomyObjectLevel1 {\n          totalCount\n        }\n      }\n    }\n  }\n  level4Taxonomy: taxonomyById(id: $level4Taxonomy) @include(if: $existsLevel4) {\n    taxonomyObjectLevel1 {\n      nodes {\n        id\n        name\n        taxonomyObjectsByParentId {\n          totalCount\n        }\n      }\n    }\n  }\n  level5Taxonomy: taxonomyObjectById(id: $level5Taxonomy) @include(if: $existsLevel5) {\n    taxonomyObjectsByParentId {\n      totalCount\n      nodes {\n        id\n        name\n        taxonomyObjectsByParentId {\n          totalCount\n        }\n      }\n    }\n  }\n  level6Taxonomy: taxonomyObjectById(id: $level6Taxonomy) @include(if: $existsLevel6) {\n    taxonomyObjectsByParentId {\n      totalCount\n      nodes {\n        id\n        name\n        taxonomyObjectsByParentId {\n          totalCount\n        }\n      }\n    }\n  }\n  level7Taxonomy: taxonomyObjectById(id: $level7Taxonomy) @include(if: $existsLevel7) {\n    taxonomyObjectsByParentId {\n      totalCount\n      nodes {\n        id\n        name\n        taxonomyObjectsByParentId {\n          totalCount\n        }\n      }\n    }\n  }\n  level8Taxonomy: taxonomyObjectById(id: $level8Taxonomy) @include(if: $existsLevel8) {\n    taxonomyObjectsByParentId {\n      totalCount\n      nodes {\n        id\n        name\n        taxonomyObjectsByParentId {\n          totalCount\n        }\n      }\n    }\n  }\n  level9Taxonomy: taxonomyObjectById(id: $level9Taxonomy) @include(if: $existsLevel9) {\n    taxonomyObjectsByParentId {\n      totalCount\n      nodes {\n        id\n        name\n        taxonomyObjectsByParentId {\n          totalCount\n        }\n      }\n    }\n  }\n  level10Taxonomy: taxonomyObjectById(id: $level10Taxonomy) @include(if: $existsLevel10) {\n    taxonomyObjectsByParentId {\n      totalCount\n      nodes {\n        id\n        name\n        taxonomyObjectsByParentId {\n          totalCount\n        }\n      }\n    }\n  }\n  taxonomyObjectById(id: $activeTaxonomyObjectId) @include(if: $existsActiveTaxonomyObject) {\n    objectByObjectId {\n      id\n      taxonomyObjectsByObjectId {\n        totalCount\n        nodes {\n          taxonomyByTaxonomyId {\n            id\n            name\n            description\n            links\n            lastUpdated\n            organizationByOrganizationId {\n              name\n            }\n          }\n          id\n          name\n          properties\n          synonymsByTaxonomyObjectId {\n            totalCount\n            nodes {\n              taxonomyObjectIdSynonym\n              taxonomyObjectByTaxonomyObjectIdSynonym {\n                id\n                name\n                properties\n                taxonomyByTaxonomyId {\n                  name\n                  description\n                  links\n                  lastUpdated\n                  organizationByOrganizationId {\n                    name\n                  }\n                }\n                objectByObjectId {\n                  id\n                  propertyCollectionObjectsByObjectId {\n                    totalCount\n                    nodes {\n                      objectId\n                      propertyCollectionId\n                      properties\n                      propertyCollectionByPropertyCollectionId {\n                        name\n                        description\n                        links\n                        combining\n                        lastUpdated\n                        termsOfUse\n                        importedBy\n                        organizationByOrganizationId {\n                          name\n                        }\n                        userByImportedBy {\n                          name\n                          email\n                        }\n                      }\n                    }\n                  }\n                }\n              }\n            }\n          }\n        }\n      }\n      propertyCollectionObjectsByObjectId {\n        totalCount\n        nodes {\n          objectId\n          propertyCollectionId\n          properties\n          propertyCollectionByPropertyCollectionId {\n            name\n            description\n            links\n            combining\n            lastUpdated\n            termsOfUse\n            importedBy\n            organizationByOrganizationId {\n              name\n            }\n            userByImportedBy {\n              name\n              email\n            }\n          }\n        }\n      }\n    }\n  }\n  urlFromTO: taxonomyObjectById(id: $urlFromTOId) @include(if: $existsUrlFromTOId) {\n    id\n    taxonomyObjectByParentId {\n      id\n      taxonomyObjectByParentId {\n        id\n        taxonomyObjectByParentId {\n          id\n          taxonomyObjectByParentId {\n            id\n            taxonomyObjectByParentId {\n              id\n              taxonomyObjectByParentId {\n                id\n              }\n            }\n          }\n        }\n      }\n    }\n    taxonomyByTaxonomyId {\n      id\n      categoryByCategory {\n        name\n        dataType\n      }\n    }\n  }\n  filterSuggestionsPC: propertyCollectionByPropertyName(propertyName: $treeFilterText) @include(if: $existsTreeFilterText) {\n    totalCount\n    nodes {\n      id\n      name\n    }\n  }\n  filterSuggestionsTO: taxonomyObjectByTaxonomyObjectName(taxonomyObjectName: $treeFilterText) @include(if: $existsTreeFilterText) {\n    totalCount\n    nodes {\n      id\n      name\n    }\n  }\n  allCategories @include(if: $queryGroups) {\n    nodes {\n      name\n    }\n  }\n  pcoPropertiesByCategoriesFunction(categories: $exportCategories) @include(if: $queryExportCategories) {\n    nodes {\n      propertyCollectionName\n      propertyName\n      jsontype\n      count\n    }\n  }\n}\n"
};

module.exports = batch;
