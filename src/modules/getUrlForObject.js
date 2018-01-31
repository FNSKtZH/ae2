// @flow
import get from 'lodash/get'

export default (tO: Object) => {
  let url = []
  const type = get(tO, 'taxonomyByTaxonomyId.type')
    .replace('ART', 'Arten')
    .replace('LEBENSRAUM', 'Lebensräume')
  if (type) url.push(type)
  const taxonomyId = get(tO, 'taxonomyByTaxonomyId.id')
  if (taxonomyId) url.push(taxonomyId)
  let tOIdsArray = []
  const level4Id = get(tO, 'id')
  if (level4Id) tOIdsArray.unshift(level4Id)
  const level5Id = get(tO, 'objectByParentId.id')
  if (level5Id) tOIdsArray.unshift(level5Id)
  const level6Id = get(tO, 'objectByParentId.objectByParentId.id')
  if (level6Id) tOIdsArray.unshift(level6Id)
  const level7Id = get(
    tO,
    'objectByParentId.objectByParentId.objectByParentId.id'
  )
  if (level7Id) tOIdsArray.unshift(level7Id)
  const level8Id = get(
    tO,
    'objectByParentId.objectByParentId.objectByParentId.objectByParentId.id'
  )
  if (level8Id) tOIdsArray.unshift(level8Id)
  const level9Id = get(
    tO,
    'objectByParentId.objectByParentId.objectByParentId.objectByParentId.objectByParentId.id'
  )
  if (level9Id) tOIdsArray.unshift(level9Id)
  const level10Id = get(
    tO,
    'objectByParentId.objectByParentId.objectByParentId.objectByParentId.objectByParentId.objectByParentId.id'
  )
  if (level10Id) tOIdsArray.unshift(level10Id)

  if (tOIdsArray.length > 0) {
    url = [...url, ...tOIdsArray]
  }
  return url
}
