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
    return {
      id: node.id,
      url: ['Eigenschaften-Sammlungen', node.id],
      sort: [2, node.name],
      label: `${node.name}: ${count} Objekte`,
      childrenCount: 0,
    }
  })
}
