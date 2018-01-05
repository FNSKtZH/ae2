// @flow
export default ({
  treeData,
  activeLevel2TaxonomyName,
  activeLevel3TaxonomyName,
  activeLevel3TaxonomyId,
  activeLevel4TaxonomyName,
  activeLevel4TaxonomyId,
}: {
  treeData: Object,
  activeLevel2TaxonomyName: ?String,
  activeLevel3TaxonomyName: ?String,
  activeLevel3TaxonomyId: ?String,
  activeLevel4TaxonomyName: ?String,
  activeLevel4TaxonomyId: ?String,
}): Array<Object> => {
  if (!treeData) return []
  if (!treeData.level5Taxonomy) return []
  if (!treeData.level5Taxonomy.objectsByParentId) return []
  if (!treeData.level5Taxonomy.objectsByParentId.nodes) return []

  return treeData.level5Taxonomy.objectsByParentId.nodes.map(node => {
    const childrenCount =
      node.objectsByParentId && node.objectsByParentId.totalCount
        ? node.objectsByParentId.totalCount
        : 0
    const labelCount = childrenCount > 0 ? ` (${childrenCount})` : ''

    return {
      id: node.id,
      url: [
        'Taxonomien',
        activeLevel2TaxonomyName,
        activeLevel3TaxonomyId,
        activeLevel4TaxonomyId,
        node.id,
      ],
      sort: [
        1,
        activeLevel2TaxonomyName,
        activeLevel3TaxonomyName,
        activeLevel4TaxonomyName,
        node.name,
      ],
      label: node.name,
      info: labelCount.toLocaleString('de-CH'),
      childrenCount,
      menuType: 'taxLevel5',
    }
  })
}
