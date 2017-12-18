// @flow
import get from 'lodash/get'

export default ({ treeData }: { treeData: Object }): Array<Object> => {
  console.log('level3PcFromProps: treeData:', treeData)
  if (!treeData) return []
  const pCId = get(treeData, 'level3Pc.id', null)
  console.log('level3PcFromProps: pCId:', pCId)
  if (!pCId) return []
  const pCCount = get(
    treeData,
    'level3Pc.propertyCollectionObjectsByPropertyCollectionId.totalCount',
    0
  )
  console.log('level3PcFromProps: pCCount:', pCCount)
  const rCCount = get(
    treeData,
    'level3Pc.relationsByPropertyCollectionId.totalCount',
    0
  )
  console.log('level3PcFromProps: rCCount:', rCCount)

  return [
    {
      id: `${pCId}pC`,
      url: ['Eigenschaften-Sammlungen', 'Eigenschaften'],
      sort: [2, 'Eigenschaften'],
      label: 'Eigenschaften',
      info: `(${pCCount} Datensätze)`,
      childrenCount: pCCount,
    },
    {
      id: `${pCId}pC`,
      url: ['Eigenschaften-Sammlungen', 'Beziehungen'],
      sort: [2, 'Beziehungen'],
      label: 'Beziehungen',
      info: `(${rCCount} Datensätze)`,
      childrenCount: rCCount,
    },
  ]
}
