// @flow
import get from 'lodash/get'

export default ({ treeData }: { treeData: Object }): Array<Object> => {
  if (!treeData) return []
  const pCId = get(treeData, 'level3Pc.id', null)
  const pCName = get(treeData, 'level3Pc.name', null)
  if (!pCId) return []
  const pCCount = get(
    treeData,
    'level3Pc.propertyCollectionObjectsByPropertyCollectionId.totalCount',
    0
  )
  const rCCount = get(
    treeData,
    'level3Pc.relationsByPropertyCollectionId.totalCount',
    0
  )

  return [
    {
      id: `${pCId}pC`,
      url: ['Eigenschaften-Sammlungen', pCId, 'Eigenschaften'],
      sort: [2, pCName, 1],
      label: 'Eigenschaften',
      info: `(${pCCount} Datensätze)`,
      childrenCount: 0,
      menuType: 'pCProperties',
    },
    {
      id: `${pCId}pC`,
      url: ['Eigenschaften-Sammlungen', pCId, 'Beziehungen'],
      sort: [2, pCName, 2],
      label: 'Beziehungen',
      info: `(${rCCount} Datensätze)`,
      childrenCount: 0,
      menuType: 'pCRelations',
    },
  ]
}
