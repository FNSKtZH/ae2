// @flow
import { toJS } from 'mobx'

import getActiveObjectId from './getActiveObjectId'

export default ({ store }: { store: Object }) => {
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
  const queryExportCategories = exportCategories && exportCategories.length > 0

  return {
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
  }
}
