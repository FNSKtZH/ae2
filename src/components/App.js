// @flow
import React from 'react'
import styled from 'styled-components'
import { observer, inject } from 'mobx-react'
import { toJS } from 'mobx'
import { gql, graphql } from 'react-apollo'
import compose from 'recompose/compose'
import Snackbar from 'material-ui/Snackbar'

import AppBar from './AppBar'
import Data from './Data'
import Export from './Export'
import ImportPc from './ImportPc'
import ImportRc from './ImportRc'
import Organisation from './Organisation'
import Login from './Login'
import FourOhFour from './FourOhFour'
import getActiveObjectId from '../modules/getActiveObjectId'

const Container = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
`

const gqlQuery = gql`
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

const enhance = compose(
  inject('store'),
  graphql(gqlQuery, {
    options: props => {
      const { store } = props
      const existsLevel1 = store.activeNodeArray.length > 0
      const existsLevel2Taxonomy =
        existsLevel1 &&
        store.activeNodeArray[0] === 'Taxonomien' &&
        store.activeNodeArray.length > 0
      const existsLevel2Pc =
        existsLevel1 &&
        store.activeNodeArray[0] === 'Eigenschaften-Sammlungen' &&
        store.activeNodeArray.length > 0
      const notExistsLevel2Pc = !existsLevel2Pc
      const existsLevel3 = store.activeNodeArray.length > 1
      const level3Taxonomy = existsLevel3 ? store.activeNodeArray[1] : 'none'
      const existsLevel4 = store.activeNodeArray.length > 2
      const level4Taxonomy = existsLevel4
        ? store.activeNodeArray[2]
        : '99999999-9999-9999-9999-999999999999'
      const level4TaxonomyPossibleNull = store.activeNodeArray[2] || null
      const existsLevel5 = store.activeNodeArray.length > 3
      const level5Taxonomy = existsLevel5
        ? store.activeNodeArray[3]
        : '99999999-9999-9999-9999-999999999999'
      const existsLevel6 = store.activeNodeArray.length > 4
      const level6Taxonomy = existsLevel6
        ? store.activeNodeArray[4]
        : '99999999-9999-9999-9999-999999999999'
      const existsLevel7 = store.activeNodeArray.length > 5
      const level7Taxonomy = existsLevel7
        ? store.activeNodeArray[5]
        : '99999999-9999-9999-9999-999999999999'
      const existsLevel8 = store.activeNodeArray.length > 6
      const level8Taxonomy = existsLevel8
        ? store.activeNodeArray[6]
        : '99999999-9999-9999-9999-999999999999'
      const existsLevel9 = store.activeNodeArray.length > 7
      const level9Taxonomy = existsLevel9
        ? store.activeNodeArray[7]
        : '99999999-9999-9999-9999-999999999999'
      const existsLevel10 = store.activeNodeArray.length > 8
      const level10Taxonomy = existsLevel10
        ? store.activeNodeArray[8]
        : '99999999-9999-9999-9999-999999999999'
      const activeObjectId = getActiveObjectId(store)
      const existsActiveObject = !!activeObjectId
      const existsUrlFromTOId = !!store.urlFromTOId
      const urlFromTOId =
        store.urlFromTOId || '99999999-9999-9999-9999-999999999999'
      const treeFilterText = store.treeFilter.text || 'ZZZZ'
      const queryGroups =
        store.activeNodeArray[0] &&
        store.activeNodeArray[0].toLowerCase() === 'export'
      const exportCategories = toJS(store.export.categories) || []
      const queryExportCategories =
        exportCategories && exportCategories.length > 0

      return {
        variables: {
          existsLevel2Pc,
          notExistsLevel2Pc,
          existsLevel2Taxonomy,
          existsLevel3,
          level3Taxonomy,
          existsLevel4,
          level4Taxonomy,
          level4TaxonomyPossibleNull,
          existsLevel5,
          level5Taxonomy,
          existsLevel6,
          level6Taxonomy,
          existsLevel7,
          level7Taxonomy,
          existsLevel8,
          level8Taxonomy,
          existsLevel9,
          level9Taxonomy,
          existsLevel10,
          level10Taxonomy,
          activeObjectId,
          existsActiveObject,
          existsUrlFromTOId,
          urlFromTOId,
          treeFilterText,
          queryGroups,
          queryExportCategories,
          exportCategories,
        },
      }
    },
  }),
  observer
)
const App = ({ store, data }: { store: Object, data: Object }) => {
  const {
    activeObject,
    filterSuggestionsTO,
    filterSuggestionsPC,
    error,
    loading,
  } = data
  console.log('App, render: data:', data)
  console.log('App, render: activeNodeArray:', toJS(store.activeNodeArray))
  store.setProps(data)

  const url0 =
    store.activeNodeArray[0] && store.activeNodeArray[0].toLowerCase()
  const url1 =
    store.activeNodeArray[1] && store.activeNodeArray[1].toLowerCase()
  const show404 =
    ![
      'taxonomien',
      'eigenschaften-sammlungen',
      'organisationen',
      'export',
      'import',
      'login',
    ].includes(url0) ||
    (url0 === 'import' &&
      !['eigenschaften-sammlungen', 'beziehungs-sammlungen'].includes(url1))
  const showData = ['taxonomien', 'eigenschaften-sammlungen'].includes(url0)
  const showExport = url0 === 'export'
  const showOrganisation = url0 === 'organisationen'
  const showLogin = url0 === 'login'
  const showImportPc = url0 === 'import' && url1 === 'eigenschaften-sammlungen'
  const showImportRc = url0 === 'import' && url1 === 'beziehungs-sammlungen'
  // TODO: lodading indicator overlay

  return (
    <Container>
      <AppBar />
      <Snackbar
        open={loading}
        message="lade Daten..."
        bodyStyle={{
          maxWidth: 100,
          minWidth: 100,
          backgroundColor: 'rgb(217, 78, 0)',
        }}
      />
      {error && <div>{error.message}</div>}
      {showData && (
        <Data
          data={data}
          activeObject={activeObject}
          filterSuggestionsTO={filterSuggestionsTO}
          filterSuggestionsPC={filterSuggestionsPC}
        />
      )}
      {showExport && <Export />}
      {showImportPc && <ImportPc />}
      {showImportRc && <ImportRc />}
      {showOrganisation && <Organisation />}
      {showLogin && <Login />}
      {show404 && <FourOhFour />}
    </Container>
  )
}

export default enhance(App)
