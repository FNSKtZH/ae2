import get from 'lodash/get'

const level2Pc = ({ treeData }) => {
  if (!treeData) return []
  const nodes = get(treeData, 'allPropertyCollections.nodes', [])

  return nodes.map((node) => {
    const pCCount = get(
      node,
      'propertyCollectionObjectsByPropertyCollectionId.totalCount',
      0,
    )
    const rCCount = get(node, 'relationsByPropertyCollectionId.totalCount', 0)
    const count = pCCount + rCCount

    return {
      id: node.id,
      url: ['Eigenschaften-Sammlungen', node.id],
      sort: [3, node.name],
      label: node.name,
      info: `(${count.toLocaleString('de-CH')})`,
      childrenCount: count,
      menuType: 'CmPC',
    }
  })
}

export default level2Pc
