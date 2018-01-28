// @flow
export default ({
  treeData,
  activeLevel2TaxonomyName,
}: {
  treeData: Object,
  activeLevel2TaxonomyName: ?String,
}): Array<Object> => {
  if (!treeData) return []
  if (!treeData.level3Taxonomy) return []
  if (!treeData.level3Taxonomy) return []
  if (!treeData.level3Taxonomy.nodes) return []

  return treeData.level3Taxonomy.nodes.map(node => {
    const childrenCount =
      node.objectLevel1 && node.objectLevel1.totalCount
        ? node.objectLevel1.totalCount
        : 0
    // give nodeName a value if it does not yet exist
    // otherwiese empty nodes are sorted before its parent
    const nodeName = node.name || 'ZZZZ'

    return {
      id: node.id,
      url: ['Taxonomien', activeLevel2TaxonomyName, node.id],
      sort: [1, activeLevel2TaxonomyName, nodeName],
      label: node.name,
      info: `(${childrenCount.toLocaleString('de-CH')})`,
      childrenCount,
      menuType: 'CmTaxonomy',
    }
  })
}
