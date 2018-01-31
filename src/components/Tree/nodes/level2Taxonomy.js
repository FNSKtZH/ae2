// @flow
import get from 'lodash/get'

export default ({
  treeData,
  activeNodeArray,
}: {
  treeData: Object,
  activeNodeArray: Object,
}): Array<Object> => {
  if (!treeData) return []
  const nodes = get(treeData, 'allTaxonomies.nodes', []).filter(node => {
    if (activeNodeArray[0] === 'Arten') {
      return node.type === 'ART'
    }
    return node.type === 'LEBENSRAUM'
  })

  return nodes.map(node => {
    const taxType = node.type
    const elem1 = taxType === 'ART' ? 'Arten' : 'Lebensräume'
    const sort1 = taxType === 'ART' ? 1 : 2
    const nodeCount = 1 //TODO

    return {
      id: node.id,
      url: [elem1, node.id],
      sort: [sort1, node.name],
      label: node.name,
      info: `(${nodeCount.toLocaleString('de-CH')} ${
        nodeCount === '1' ? 'Taxonomie' : 'Taxonomien'
      })`,
      childrenCount: nodeCount,
      menuType: 'CmType',
    }
  })
}
