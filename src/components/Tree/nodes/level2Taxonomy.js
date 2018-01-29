// @flow

export default ({
  treeData,
}: {
  treeData: Object,
  activeLevel2TaxonomyName: Object,
}): Array<Object> => {
  if (!treeData) return []
  if (!treeData.level2Taxonomy) return []
  if (!treeData.level2Taxonomy.nodes) return []
  console.log('level2 nodes:', treeData.level2Taxonomy.nodes)

  return treeData.level2Taxonomy.nodes.map(node => {
    const taxType = node.type
    const elem1 = taxType === 'ART' ? 'Arten' : 'Lebensräume'
    const sort1 = taxType === 'ART' ? 1 : 2
    const nodeCount = 1 //TODO

    return {
      id: node.id,
      url: [elem1, node.name],
      sort: [sort1, node.name],
      label: node.name,
      info: `(${nodeCount.toLocaleString('de-CH')} ${
        nodeCount === '1' ? 'Taxonomie' : 'Taxonomien'
      })`,
      childrenCount: nodeCount,
      menuType: 'CmCategory',
    }
  })
}
