// @flow
import get from 'lodash/get'

export default ({ treeData }: { treeData: Object }): Array<Object> => {
  if (!treeData) return []
  if (!treeData.allPropertyCollections) return []
  if (!treeData.allPropertyCollections.nodes) return []

  return treeData.allPropertyCollections.nodes.map(node => {
    const count = get(
      node,
      'propertyCollectionObjectsByPropertyCollectionId.totalCount',
      0
    )
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

    return {
      id: node.id,
      url: ['Eigenschaften-Sammlungen', node.id],
      sort: [3, node.name],
      label: node.name,
      info: `(${count.toLocaleString('de-CH')} Arten/Lebensräume)`,
      childrenCount: pCCount + rCCount,
      menuType: 'pC',
    }
  })
}
