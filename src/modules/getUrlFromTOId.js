// @flow
import get from 'lodash/get'

export default (tO: Object) => {
  let url = []
  const dataType = get(tO, 'taxonomyByTaxonomyId.categoryByCategory.dataType')
  if (dataType) url.push(dataType)
  const category = get(tO, 'taxonomyByTaxonomyId.categoryByCategory.name')
  if (category) url.push(category)
  const taxonomyId = get(tO, 'taxonomyByTaxonomyId.id')
  if (taxonomyId) url.push(taxonomyId)
  let tOIdsArray = []
  const level4Id = get(tO, 'id')
  if (level4Id) tOIdsArray.unshift(level4Id)
  const level5Id = get(tO, 'taxonomyObjectByParentId.id')
  if (level5Id) tOIdsArray.unshift(level5Id)
  const level6Id = get(
    tO,
    'taxonomyObjectByParentId.taxonomyObjectByParentId.id'
  )
  if (level6Id) tOIdsArray.unshift(level6Id)
  const level7Id = get(
    tO,
    'taxonomyObjectByParentId.taxonomyObjectByParentId.taxonomyObjectByParentId.id'
  )
  if (level7Id) tOIdsArray.unshift(level7Id)
  const level8Id = get(
    tO,
    'taxonomyObjectByParentId.taxonomyObjectByParentId.taxonomyObjectByParentId.taxonomyObjectByParentId.id'
  )
  if (level8Id) tOIdsArray.unshift(level8Id)
  const level9Id = get(
    tO,
    'taxonomyObjectByParentId.taxonomyObjectByParentId.taxonomyObjectByParentId.taxonomyObjectByParentId.taxonomyObjectByParentId.id'
  )
  if (level9Id) tOIdsArray.unshift(level9Id)
  const level10Id = get(
    tO,
    'taxonomyObjectByParentId.taxonomyObjectByParentId.taxonomyObjectByParentId.taxonomyObjectByParentId.taxonomyObjectByParentId.taxonomyObjectByParentId.id'
  )
  if (level10Id) tOIdsArray.unshift(level10Id)

  if (tOIdsArray.length > 0) {
    url = [...url, ...tOIdsArray]
  }
  return url
}
