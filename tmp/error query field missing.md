query field missing in result

I hope this is not a very nooby oversight of mine.

This query runs perfectly fine in GraphiQL:

```graphql
query AppQueryQuery(
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
  $treeFilterId: UUID!
  $existsTreeFilterId: Boolean!
  $treeFilterText: String!
  $queryGroups: Boolean!
  $queryExportTaxonomies: Boolean!
  $exportTaxonomies: [String]
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
  level2Taxonomy: categoriesOfTaxonomiesCountFunction
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
  level5Taxonomy: objectById(id: $level5Taxonomy) @include(if: $existsLevel5) {
    ...ObjektLevel5AndUp
  }
  level6Taxonomy: objectById(id: $level6Taxonomy) @include(if: $existsLevel6) {
    ...ObjektLevel5AndUp
  }
  level7Taxonomy: objectById(id: $level7Taxonomy) @include(if: $existsLevel7) {
    ...ObjektLevel5AndUp
  }
  level8Taxonomy: objectById(id: $level8Taxonomy) @include(if: $existsLevel8) {
    ...ObjektLevel5AndUp
  }
  level9Taxonomy: objectById(id: $level9Taxonomy) @include(if: $existsLevel9) {
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
  pcoPropertiesByTaxonomiesFunction(categories: $exportTaxonomies)
    @include(if: $queryExportTaxonomies) {
    nodes {
      propertyCollectionName
      propertyName
      jsontype
      count
    }
  }
}

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
```

The query gets these variables passed in:
```json
{
  "existsLevel2Pc":false,
  "existsLevel2Taxonomy":true,
  "existsLevel3":false,
  "existsLevel4":false,
  "existsLevel5":false,
  "existsLevel6":false,
  "existsLevel7":false,
  "existsLevel8":false,
  "existsLevel9":false,
  "existsLevel10":false,
  "existsTreeFilterId":true,
  "exportTaxonomies":[],
  "level3Taxonomy":"none",
  "level4Taxonomy":"99999999-9999-9999-9999-999999999999",
  "level4TaxonomyPossibleNull":null,
  "level5Taxonomy":"99999999-9999-9999-9999-999999999999",
  "level6Taxonomy":"99999999-9999-9999-9999-999999999999",
  "level7Taxonomy":"99999999-9999-9999-9999-999999999999",
  "level8Taxonomy":"99999999-9999-9999-9999-999999999999",
  "level9Taxonomy":"99999999-9999-9999-9999-999999999999",
  "level10Taxonomy":"99999999-9999-9999-9999-999999999999",
  "notExistsLevel2Pc":true,
  "queryExportTaxonomies":false,
  "queryGroups":false,
  "treeFilterId":"14bd613c-1f03-4907-b7af-7b590fdca42c",
  "treeFilterText":"Canis lupus Linnaeus, 1758 (Wolf)"
}
```

In GraphiQL it produdes this output:
```json
{
  "data": {
    "allCategories": {
      "totalCount": 5
    },
    "allPropertyCollections": {
      "totalCount": 54
    },
    "level2Taxonomy": {
      "nodes": [
        {
          "id": "a8e46fb4-696f-11e7-b44e-33987310098e",
          "name": "Fauna",
          "count": "1"
        },
        {
          "id": "a8e4e52a-696f-11e7-b44f-77417e37690f",
          "name": "Flora",
          "count": "1"
        },
        {
          "id": "a8e4f8c7-696f-11e7-b452-cb1c4fd1364b",
          "name": "Lebensräume",
          "count": "36"
        },
        {
          "id": "a8e4e52b-696f-11e7-b450-6b1280f432ee",
          "name": "Moose",
          "count": "1"
        },
        {
          "id": "a8e4f8c6-696f-11e7-b451-1be2de9de286",
          "name": "Pilze",
          "count": "1"
        }
      ]
    },
    "objectUrlData": {
      "id": "14bd613c-1f03-4907-b7af-7b590fdca42c",
      "categoryByCategory": {
        "id": "a8e46fb4-696f-11e7-b44e-33987310098e",
        "name": "Fauna",
        "dataType": "Taxonomien"
      },
      "objectByParentId": {
        "id": "a924b1ff-696f-11e7-b712-f90bfedd3cfd",
        "objectByParentId": {
          "id": "a8fdc89d-696f-11e7-b712-f90bfedd3cfd",
          "objectByParentId": {
            "id": "a8f6c38a-696f-11e7-b712-f90bfedd3cfd",
            "objectByParentId": null
          }
        }
      },
      "taxonomyByTaxonomyId": {
        "id": "a8f11e30-696f-11e7-b712-f90bfedd3cfd"
      }
    },
    "filterSuggestionsPC": {
      "nodes": []
    },
    "filterSuggestionsTO": {
      "nodes": [
        {
          "id": "14bd613c-1f03-4907-b7af-7b590fdca42c",
          "name": "Canis lupus Linnaeus, 1758 (Wolf)"
        }
      ]
    }
  }
}
```

The problem is: When I run this in apollo, the `objectUrlData` field is not output.
Also: the result of the query appears in the prop `data` although it was given a name of `appData` (`appData` is undefined).
This is the code:

App.js (extract):

```js
const activeNodeArrayData = graphql(gql`
  query activeNodeArrayQuery {
    activeNodeArray @client
  }`, {
  name: 'activeNodeArrayData',
})
const treeFilterTextData = graphql(gql`
  query treeFilterTextQuery {
    treeFilterText @client
  }
`, {
  name: 'treeFilterTextData',
})
const treeFilterIdData = graphql(gql`
  query treeFilterIdQuery {
    treeFilterId @client
  }
`, {
  name: 'treeFilterIdData',
})
const appData = graphql(appQuery, {
  options: ({
    activeNodeArrayData,
    treeFilterTextData,
    treeFilterIdData,
  }: {
    activeNodeArrayData: Object,
    treeFilterTextData: Object,
    treeFilterIdData: Object,
  }) => ({
    variables: variablesFromStore({
      activeNodeArrayData,
      treeFilterTextData,
      treeFilterIdData,
    }),
    name: 'appData',
  }),
})

const enhance = compose(
  withApollo,
  activeNodeArrayData,
  treeFilterTextData,
  treeFilterIdData,
  appData
)

const App = ({
  client,
  data,
  activeNodeArrayData,
  treeFilterTextData,
  treeFilterIdData,
}: {
  client: Object,
  data: Object,
  activeNodeArrayData: Object,
  treeFilterTextData: Object,
  treeFilterIdData: Object,
}) => {
  console.log('App rendering, data:', data)
  ...more
}

export default enhance(App)
```

Where:

- `variablesFromStore` returns the variables also used above in GraphiQL
- `activeNodeArray`, `treeFilterText` and `treeFilterId` are client state managed with apollo-link-state

appQuery:
```js
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
    $treeFilterId: UUID!
    $existsTreeFilterId: Boolean!
    $treeFilterText: String!
    $queryGroups: Boolean!
    $queryExportTaxonomies: Boolean!
    $exportTaxonomies: [String]
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
    level2Taxonomy: categoriesOfTaxonomiesCountFunction
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
    pcoPropertiesByTaxonomiesFunction(categories: $exportTaxonomies)
      @include(if: $queryExportTaxonomies) {
      nodes {
        propertyCollectionName
        propertyName
        jsontype
        count
      }
    }
  }
  ${TreeRow.fragments.objektLevel5AndUp}
`
```

TreeRow.js (extract)
```js
TreeRow.fragments = {
  objektLevel5AndUp: gql`
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
  `,
}
```

so what am I doing wrong that makes:

- the `objectUrlData` field not being output?
- the result of the query to appear in the prop `data` instead of `appData`?
